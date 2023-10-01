importScripts(["../../js/messaging.js"]);
importScripts(["offscreen-document.js"]);
importScripts(["time.js"]);
importScripts(["service-worker-messaging.js"]);
importScripts(["service-worker-storage.js"]);


const OFFSCREEN = "offscreen";

const sendUpdateSharedSavedRepliesCommand = async (name, url) => {

    const command = createCommand(`UpdateSharedSavedReplies`, OFFSCREEN, {name:name, url: url});

    await send(command);

    return true;
}

const sendUpdateSharedSavedRepliesMessageToOffScreen = async (name) => {
    
    await setupOffscreenDocument();

    const url = await getUrlForShareSavedRepliesName(name);
    
    await sendUpdateSharedSavedRepliesCommand(name,url);

    // await closeOffscreenDocument();
}


chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason !== "install" && details.reason !== "update") return;
});

chrome.storage.onChanged.addListener(async (changes, area) => {

    //if changes contains saved replies updates then send command
    
    const configKeyRegEx = /(?<name>.+)-config/;

    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
       
        console.log(
            `Storage key "${key}" in namespace "${area}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
          );

        const matches = key.match(configKeyRegEx);

        const name = matches?.groups['name'];

        if(name && !isNullOrEmpty(newValue)){

            await sendUpdateSharedSavedRepliesMessageToOffScreen(name);
            
            return;
        }                   
      }   
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    await handleSaveSharedSavedRepliesCommand(request, async (name, replies) => {
        
        console.log(`saving replies for ${name}.`);

        await saveSharedSavedReplies(name,replies);
    });
});