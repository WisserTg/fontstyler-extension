/*
    Wisser Tg | 2019
    No Copyright
*/
(function () {
    if (typeof jQuery === "undefined" || typeof $ === "undefined")
        throw new Error("jQuery hasn't been loaded.");

    let port = chrome.extension.connect();

    function update(items) {
        $(".change-sites-list").empty();
        for (const href in items) {
            const font = items[href];

            $(".change-sites-list").append(
                $("<li>").addClass("change-sites-item").append(
                    $("<span>").addClass("change-sites-href").html(href)
                ).append(
                    $("<span>").addClass("change-sites-font").html(font)
                )
            );
        }
    };

    $(document).ready(function() {
        port.onMessage.addListener(update);
        port.postMessage({type: "update"});
    });

    $(document).ready(function() {
        $("#change-apply-one").on("click", function() {
            let font = $("#change-input").val();
            port.postMessage({type: "apply_once", font: font});
        });
        $("#change-apply-auto").on("click", function() {
            let font = $("#change-input").val();
            port.postMessage({type: "apply_auto", font: font});
        });
        $("#change-clear-data").on("click", function() {
            chrome.storage.local.clear();
            port.postMessage({type: "clear_data"});
        });
        $("#change-clear-this").on("click", function() {
            port.postMessage({type: "clear_this"});
        });
        $(".change-form").on("submit", function() {
            // Same as #change-apply-one click
            let font = $("#change-input").val();
            port.postMessage({type: "apply_once", font: font});

            return false;
        });
    });
})();
