
const showHideSavedRepliesButton = async (showButton) => {

    const showSavedRepliesButtons =
        document.querySelectorAll(".show-saved-replies-button-container");

    let firstUpdated = false;

    for (button of showSavedRepliesButtons) {

        if (firstUpdated) {
            button.remove();
        }

        if (button !== undefined) {
            if (showButton) {
                button?.classList?.remove("hide");
            } else {
                button?.classList?.add("hide");
            }
            firstUpdated = true;
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

    if (showSavedRepliesButton !== undefined) {

        const showSavedRepliesButton = createShowSavedRepliesButton();

        await addShowSavedRepliesClickHandler(showSavedRepliesButton);

        // addShowSavedRepliesMouseMoveHandlers(showSavedRepliesButton)

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