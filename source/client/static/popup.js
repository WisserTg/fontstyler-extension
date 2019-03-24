/*
    Wisser Tg | 2019
    No Copyright
*/
(function () {
    if (typeof jQuery === "undefined" || typeof $ === "undefined")
        throw new Error("jQuery hasn't been loaded.");

    let port = chrome.extension.connect();

    $(document).ready(() => {
        $("#change-apply-one").on("click", () => {
            let font = $("#change-input").val();
            port.postMessage({type: "apply_once", font: font});
        });
        $("#change-apply-auto").on("click", () => {
            let font = $("#change-input").val();
            port.postMessage({type: "apply_auto", font: font});
        });
        $("#change-clear-data").on("click", () => {
            chrome.storage.local.clear();
            port.postMessage({type: "clear"});
        });
        $(".change-form").on("submit", () => {
            // Same as #change-apply-one click
            let font = $("#change-input").val();
            port.postMessage({type: "apply_once", font: font});

            return false;
        });
    });
})();
