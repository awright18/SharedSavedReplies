const updatePopupContent = async () => {

    let savedReliesUrl = await getSavedRepliesFromLocalStorage();

    let needsUrl = document.querySelector(".needs-url");

    let hasUrl = document.querySelector(".has-url");

    if (savedReliesUrl) {
        needsUrl.classList.remove("hidden")
        hasUrl.classList.add("hidden");
    } else {
        needsUrl.classList.add("hidden")
        hasUrl.classList.remove();
    }
}

document.getElementById(`save`)
    .addEventListener(`click`, async () => {
        let savedRepliesUrl =
            document.getElementById(`saved-replies-url`).value;

        await sendUpdateSavedRepliesUrlMessage(savedRepliesUrl);
        
        await updatePopupContent();
    });

document.getElementById(`options-link`)
    .addEventListener(`click`, async () => {
        await chrome.runtime.openOptionsPage();
    })

