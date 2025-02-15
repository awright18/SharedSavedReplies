
const showHideSavedRepliesButton = async (showButton) => {

    var showSavedRepliesButton =
        document.querySelector(".show-saved-replies-button-container");

    if (showSavedRepliesButton === undefined || showSavedRepliesButton == null) {

        showSavedRepliesButton = createShowSavedRepliesButton();

        await addShowSavedRepliesClickHandler(showSavedRepliesButton);

        document.body.appendChild(showSavedRepliesButton);
    }

    if (showSavedRepliesButton !== undefined) {

        if (showButton !== undefined && showButton) {
            showSavedRepliesButton?.classList?.remove("hide");
        } else {
            showSavedRepliesButton?.classList?.add("hide");
        }
    }
}

const main = async () => {

    console.log("main called");

    const url = window.location.href;

    if (!shouldLoadContentScript(url)) {
        return;
    }

    const showSavedRepliesButton =
        document.querySelector(".show-saved-replies-button-container");

    if (showSavedRepliesButton === undefined || showSavedRepliesButton == null) {

        const showSavedRepliesButton = createShowSavedRepliesButton();

        await addShowSavedRepliesClickHandler(showSavedRepliesButton);

        document.body.appendChild(showSavedRepliesButton);
    }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    handleCanLoadSavedRepliesChanged(request, (canLoadSavedReplies) => {
        showHideSavedRepliesButton(canLoadSavedReplies);
    });
});

document.addEventListener("soft-nav:end", main);

main().catch((error) => {
    console.error("Oh no!", error);
});