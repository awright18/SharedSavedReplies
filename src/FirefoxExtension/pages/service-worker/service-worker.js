import { fetchSavedRepliesFromUrl } from "../../js/modules/fetch-saved-replies.js";
import { createCommand, send } from "../../js/modules/messaging.js"; 
// import {} from "../../js/modules/time.js";
import { isNullOrEmpty } from "../../js/modules/null.js";
import { handleUpdateSharedSavedRepliesCommand, sendSaveSharedSavedRepliesCommand } from "../offscreen/offscreen-messaging.js";
import { handleSaveSharedSavedRepliesCommand } from "./service-worker-messaging.js";
import { getUrlForShareSavedRepliesName, removeDataFromLocalStorage, saveRepliesInLocalStorage, getConfigFromLocalStorage  } from "./service-worker-storage.js";
import { clearAlarm, onAlarm} from "./service-worker-alarms.js";


const OFFSCREEN = "offscreen";

const sendUpdateSharedSavedRepliesCommand = async (name, url) => {

    const command = createCommand(`UpdateSharedSavedReplies`, OFFSCREEN, { name: name, url: url });

    await send(command);

    return true;
}

const sendUpdateSharedSavedRepliesMessageToOffScreen = async (name) => {

    // await setupOffscreenDocument();

    const url = await getUrlForShareSavedRepliesName(name);

    await sendUpdateSharedSavedRepliesCommand(name, url);

    // await closeOffscreenDocument();
}


browser.storage.onChanged.addListener(async (changes, area) => {

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

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    await handleSaveSharedSavedRepliesCommand(request, async (name, replies) => {

        console.log(`saving replies for ${name}.`);

        await saveRepliesInLocalStorage(name, replies);

        const config = await getConfigFromLocalStorage(name);

        await createAlarm(name, config.refreshRateInMinutes);
    });

    await handleUpdateSharedSavedRepliesCommand(
        request,       
        async (name,url) => {
            try {                                    

                console.log("offscreen-savedRepliesUrl", url);

                const replies = await fetchSavedRepliesFromUrl(url);
    
                await sendSaveSharedSavedRepliesCommand(name, replies);    
            }
            catch (error){                
                
                console.log("offscreen",error);               
            }

            return true;
    }); 
});


onAlarm(async (name) =>
    await sendUpdateSharedSavedRepliesMessageToOffScreen(name));

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
    { url: [{ urlMatches: "https://github.com/" }] }
);


export {sendUpdateSharedSavedRepliesMessageToOffScreen, sendUpdateSharedSavedRepliesCommand}