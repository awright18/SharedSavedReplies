const updatePopupContent = async (savedRepliesUrl) => {
    
    let needsUrl = document.querySelector(".needs-url");

    let hasUrl = document.querySelector(".has-url");

    if (savedRepliesUrl) {
        needsUrl.classList.remove("hidden")
        hasUrl.classList.add("hidden");
    } else {
        needsUrl.classList.add("hidden")
        hasUrl.classList.remove();
    }
}

chrome.runtime.onMessage.addListener(async (message) => {
    
    await handleSavedRepliesUrlChangedEvent(
        message,
        updatePopupContent);
});

document.getElementById(`save`)
    .addEventListener(`click`, async () => {
        let savedRepliesUrl =
            document.getElementById(`saved-replies-url`).value;

        await sendUpdateSavedRepliesUrlCommand(savedRepliesUrl);
        
        console.log("update url message sent");
        
        await updatePopupContent();
    });

document.getElementById(`options-link`)
    .addEventListener(`click`, async () => {
        await chrome.runtime.openOptionsPage();
    })

