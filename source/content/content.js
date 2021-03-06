(function () {
    var changer = (function () {
        let dom = document.createElement("style");
        
        // WebKit willn't work if we'll not add child text node.
        // Also let's add a rule here.
        dom.appendChild(document.createTextNode("* { }"));
        
        document.head.appendChild(dom);

        return function (font) {
            // dom.innerHTML = "* { font-family: \"" + font + "\" !important; }";
            // dom.innerHTML = "@font-face { font-family: \"" + font + "\"; src: local(\"" + font + "\"), url(\"" + "\"); } * { font-family: \"" + font + "\"; }";
            dom.innerHTML = "@import url(\"" + "https://fonts.googleapis.com/css?family=" + font + "\");" +
                "* { font-family: \"" + font + "\" !important; }";
        };
    })();

    chrome.runtime.onMessage.addListener(function (message) {
        if (message.from === "background.min.js") {
            changer(message.font);
        }
    });
})();