import { fetchSavedRepliesFromUrl } from "../../js/modules/fetch-saved-replies.js";
import { isNullOrEmpty } from "../../js/modules/null.js";
import { getUrlForShareSavedRepliesName, removeDataFromLocalStorage, saveRepliesInLocalStorage, getConfigFromLocalStorage  } from "./service-worker-storage.js";
import { clearAlarm, onAlarm, createAlarm} from "./service-worker-alarms.js";

const updateSharedSavedReplies = async (name) => {

    const url = await getUrlForShareSavedRepliesName(name);

    const replies = await fetchSavedRepliesFromUrl(url);

    await saveRepliesInLocalStorage(name, replies);

     const config = await getConfigFromLocalStorage(name);

    await createAlarm(name, config.refreshRateInMinutes);    
}

browser.runtime.onInstalled.addListener( async(details) => {
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
    },
    { url: [{ urlMatches: "https://github.com/*" }] }
);