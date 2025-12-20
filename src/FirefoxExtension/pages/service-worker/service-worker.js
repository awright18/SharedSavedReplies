import { fetchSavedRepliesFromUrl } from "../../js/modules/fetch-saved-replies.js";
import { isNullOrEmpty } from "../../js/modules/null.js";
import { getUrlForShareSavedRepliesName, removeDataFromLocalStorage, saveRepliesInLocalStorage, getConfigFromLocalStorage  } from "./service-worker-storage.js";
import { clearAlarm, onAlarm, createAlarm} from "./service-worker-alarms.js";
import { saveInitialSettings } from "./service-worker-settings.js"; 
import { setCurrentActiveURL } from "../../js/modules/urls.js";
import {createCanLoadSavedRepliesChangedEvent} from "../../js/modules/events.js";
import { canLoadSavedRepliesForURL } from "../../js/modules/can-load-saved-replies.js";

let currentActiveUrl = null;

browser.menus.create({
    id: "saved-replies-toggle-sidebar",
    title: "Toggle saved replies",
    icons: {
        "16": "icons/icon16.png",
        "32": "icons/icon32.png"
    },
    command: "_execute_sidebar_action",
    contexts: ["editable"],
    documentUrlPatterns: ["*://github.com/*"],
});

//update url for actviated tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.active) {
        
        const canLoadReplies = await canLoadSavedRepliesForURL(tab.url);

        if(!canLoadReplies){

            browser.sidebarAction.close();                                 
        }
        else{
           
        }
    }
});
  
//update current url for updated tab when url in a tab changes
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.active) {
      
        const canLoadReplies = await canLoadSavedRepliesForURL(tab.url);

        if(!canLoadReplies){

            browser.sidebarAction.close();                             
        }
        else{
                       
        }
    }
});


//if needing to communicate with content-script via port then use this 
// let contentScriptPort = null;

// const connected = async (port) => {

//     console.log("service-worker connected to port:", port.name);

//     contentScriptPort = port;

//     port.onMessage.addListener((message) => {

//         console.log("service-worker received message from port:", port.name, message);
//     });

//     port.onDisconnect.addListener(() => {
//         contentScriptPort = null;
//     });

//     console.log("service-worker connected to port:", port.name);
// }

// browser.runtime.onConnect.addListener(connected);

const tryPublishCanLoadSavedRepliesChangedEvent = async (tabId, url) =>{

    const canLoadSavedReplies = await canLoadSavedRepliesForURL(url);

    const canLoadSavedRepliesChangedEvent = 
        createCanLoadSavedRepliesChangedEvent(canLoadSavedReplies);

    await trySendMessageToContentScript(tabId, canLoadSavedRepliesChangedEvent);
}

const updateSharedSavedReplies = async (name) => {

    const url = await getUrlForShareSavedRepliesName(name);

    const replies = await fetchSavedRepliesFromUrl(url);

    await saveRepliesInLocalStorage(name, replies);

     const config = await getConfigFromLocalStorage(name);

    await createAlarm(name, config.refreshRateInMinutes);    
}

browser.runtime.onInstalled.addListener( async(details) => {
   

    console.log("service-worker started");
    
    if (details.reason !== "install" && details.reason !== "update") return;

    await saveInitialSettings();
});

chrome.runtime.onStartup.addListener(async () => {
    
    console.log("service-worker started");
    
    activeTabId = (await chrome.tabs.query({ active: true, currentWindow: true }))[0]?.id
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    
    activeTabId = activeInfo.tabId;

    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.active) {
       
      setCurrentActiveURL(tab.url);
    }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.active) {
        
        if(changeInfo.url !== undefined){
            setCurrentActiveURL(tab.url);
        }
    }
});


browser.storage.onChanged.addListener(async (changes, area) => {

    console.log("on storage changed");
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

            await updateSharedSavedReplies(name);

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


onAlarm(async (name) => await updateSharedSavedReplies(name));

browser.webNavigation.onHistoryStateUpdated.addListener(
    async (details) =>  {

        //This seems to force the content-script to be reloaded.
        const getCurrentTab = async () => {
            let queryOptions = { active: true, lastFocusedWindow: true };     
            let [tab] = await browser.tabs.query(queryOptions);
            return tab;
        }
        
        let tab = await getCurrentTab();

        browser.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {}
        });

        if(currentActiveTabUrl != details.url){
            
            currentActiveTabUrl = details.url;
            
            setCurrentActiveURL(details.url);
        }

      
    },
    { url: [{ urlMatches: "https://github.com/*" }] }
);