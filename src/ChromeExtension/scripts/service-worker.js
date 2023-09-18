importScripts(["messaging.js"]);
importScripts(["time.js"]);
importScripts(["storage.js"]);
importScripts(["offscreen-document.js"]);

const sendFetchSavedRepliesFromUrlMessageToOffScreen = async (savedRepliesUrl) => {
    await sendMessageToOffscreenDocument(
        async () => {
            await sendFetchSavedRepliesFromUrlCommand(savedRepliesUrl);
        }
    );
}

chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason !== "install" && details.reason !== "update") return;
});

chrome.storage.onChanged.addListener(async (changes, area) => {

    await handleSavedRepliesUrlStorageChangedEvent(
        changes,
        area,
        publishSavedRepliesUrlChangedEvent);
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    await handleUpdateSavedRepliesUrlCommand(
        request,
        SERVICE_WORKER,
        addSavedRepliesUrlToLocalStorage);

    await handleStoreSavedRepliesCommand(
        request,
        SERVICE_WORKER,
        async (savedReplies) => {
            await addSavedRepliesToLocalStorage(savedReplies);
            await addSavedRepliesLastUpdatedAtToLocalStorage();
        });

    await handleSavedRepliesUrlChangedEvent(
        request,
        sendFetchSavedRepliesFromUrlMessageToOffScreen);

    await handleFailedToFetchSavedRepliesEvent(
        request,
        (error) => console.log(error));
});