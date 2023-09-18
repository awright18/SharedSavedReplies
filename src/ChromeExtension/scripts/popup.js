const updatePopupContent = (savedRepliesUrl) => {

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

document.getElementById(`save`)
    .addEventListener(`click`, async (event) => {

        let savedRepliesUrl =
            document.getElementById(`saved-replies-url`).value;

        if (savedRepliesUrl) {

            await sendUpdateSavedRepliesUrlCommand(savedRepliesUrl);

            console.log("update url message sent");           
        }

        // updatePopupContent(savedRepliesUrl);       
    });

document.getElementById(`options-link`)
    .addEventListener(`click`, async () => {
        await chrome.runtime.openOptionsPage();
    })

