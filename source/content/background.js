(function () {
    if (typeof chrome === "undefined")
        // Almost unreal, but
        throw new Error("No chrome variable found.");

    function query(callback) {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            function (tabs) {
                callback(tabs[0]);
            }
        );
    }

    function set(hostname, font) {
        chrome.storage.local.set(
            {
                [hostname]: font
            }
        );
    }

    function get(hostname, callback) {
        chrome.storage.local.get(
            [hostname],
            function (map) {
                callback(map[hostname]);
            }
        );
    }

    function clear() {
        chrome.storage.local.clear();
    }

    function send(id, font) {
        chrome.tabs.sendMessage(
            id,
            {
                from: "background.min.js",
                font: font
            }
        );
    }

    chrome.tabs.onUpdated.addListener(function (id) {
        chrome.tabs.get(id, function (tab) {
            if (tab.status !== "complete")
                return; // Tab hasn't loaded yet.
            
            // new URL() will generate new object with some parameters, we need to get hostname from URL, so there's it.
            let hostname = new URL(tab.url).hostname;

            get(hostname, function (font) {
                if (font)
                    send(id, font);
                else
                    return;
            });
        });
    });


    chrome.extension.onConnect.addListener(function (port) {
        port.onMessage.addListener(function (message) {
            if (message.type === "apply_once")
                query(function (tab) {
                    send(tab.id, message.font);
                });
            else if (message.type === "apply_auto")
                query(function (tab) {
                    set(new URL(tab.url).hostname, message.font);
                    send(tab.id, message.font);
                });
            else if (message.type === "clear")
                clear();
            else
                return;
        });
    });
})();