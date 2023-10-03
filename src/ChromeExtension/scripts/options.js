document.getElementById(`add-shared-saved-replies-url`)
    .addEventListener(`click`, async () => {
        let sharedSavedRepliesUrl =
            document.getElementById(`sharedSavedRepliesUrl`).value;

        await addSavedRepliesUrlToLocalStorage(sharedSavedRepliesUrl);

        let url = await getSavedRepliesUrlFromLocalStorage();

        console.log(url);
    });

