﻿importScripts(["../../js/messaging.js"]);
importScripts(["../../js/message-receivers.js"]);
importScripts(["../../js/time.js"]);
importScripts(["../../js/null.js"]);
importScripts(["../../js/tabs.js"]);
importScripts(["../../js/elements.js"]);
importScripts(["../../js/saved-replies-storage.js"]);
importScripts(["../../js/urls.js"]);
importScripts(["../../js/events.js"]);
importScripts(["../../js/can-load-saved-replies.js"])
importScripts(["offscreen-document.js"]);
importScripts(["service-worker-messaging.js"]);
importScripts(["service-worker-storage.js"]);
importScripts(["service-worker-alarms.js"]);
importScripts(["service-worker-settings.js"]);

const OFFSCREEN = "offscreen";

//set the activeTabId
let activeTabId;
let currentActiveTabUrl;

setInterval(chrome.runtime.getPlatformInfo, 25e3);

chrome.runtime.onStartup.addListener(async () => {
    activeTabId = (await chrome.tabs.query({ active: true, currentWindow: true }))[0]?.id;
});

const tryPublishCanLoadSavedRepliesChangedEvent = async (tabId, url) =>{

    const canLoadSavedReplies = await canLoadSavedRepliesForURL(url);

    const canLoadSavedRepliesChangedEvent = 
        createCanLoadSavedRepliesChangedEvent(canLoadSavedReplies);

    await trySendMessageToContentScript(tabId, canLoadSavedRepliesChangedEvent);
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    
    activeTabId = activeInfo.tabId;

    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.active) {
       
      setCurrentActiveURL(tab.url);

    }
});

//update current url for updated tab when url in a tab changes
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.active) {
        
        if(changeInfo.url !== undefined){
            setCurrentActiveURL(tab.url);
        }
    }
});

const sendUpdateSharedSavedRepliesCommand = async (name, url) => {

    const command = createCommand(`UpdateSharedSavedReplies`, OFFSCREEN, { name: name, url: url });

    await send(command);

    return true;
}

const sendUpdateSharedSavedRepliesMessageToOffScreen = async (name) => {

    await setupOffscreenDocument();

    const url = await getUrlForShareSavedRepliesName(name);

    await sendUpdateSharedSavedRepliesCommand(name, url);

    // await closeOffscreenDocument();
}

chrome.runtime.onInstalled.addListener(async (details) => {

    if (details.reason !== "install" && details.reason !== "update") return;

    await saveInitialSettings();
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

        if (name && !isNullOrEmpty(newValue)) {

            await sendUpdateSharedSavedRepliesMessageToOffScreen(name);

            return;
        }

        //config removed 
        if (name && !isNullOrEmpty(oldValue) && isNullOrEmpty(newValue)) {

            console.log(`config removed for ${name}`);

            await removeDataFromLocalStorage(name);

            await clearAlarm(name)
        }
    }
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    handleOpenSharedSavedRepliesPanel(request, () =>{  
        
        chrome.sidePanel.open({ tabId: activeTabId });
    });

    await handleSaveSharedSavedRepliesCommand(request, async (name, replies) => {

        console.log(`saving replies for ${name}.`);

        await saveRepliesInLocalStorage(name, replies);

        const config = await getConfigFromLocalStorage(name);

        await createAlarm(name, config.refreshRateInMinutes);
    });
});

onAlarm(async (name) =>
    await sendUpdateSharedSavedRepliesMessageToOffScreen(name));

chrome.webNavigation.onHistoryStateUpdated.addListener( 
    async (details) =>  {

        //This seems to force the content-script to be reloaded.
        const getCurrentTab = async () => {
            let queryOptions = { active: true, lastFocusedWindow: true };     
            let [tab] = await chrome.tabs.query(queryOptions);
            return tab;
        }
        let tab = await getCurrentTab();

        if(currentActiveTabUrl != details.url){
            tryPublishCanLoadSavedRepliesChangedEvent(details.tabId, details.url);
        }

        currentActiveTabUrl = details.url;

}, {url: [{hostSuffix: 'github.com'}]});