importScripts(["messaging.js"]);
importScripts(["storage.js"]);

chrome.runtime.onInstalled.addListener(async (details) => {
    if(details.reason !== "install" && details.reason !== "update") return;
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    await handleUpdateSavedRepliesUrlMessage(request,async (savedRepliesUrl) =>{
        await addSavedRepliesUrlToLocalStorage(savedRepliesUrl)   
    });
});


