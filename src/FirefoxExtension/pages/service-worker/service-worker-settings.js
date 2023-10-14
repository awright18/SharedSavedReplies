import { arrayIsNullOrEmpty, isNullOrEmpty } from "../../js/modules/null.js";

const getInitalSettings = () => {
    
    console.log(`initial settings`);

    return {
        theme: `default`,
        allowEverywhereDefault: true,
        limitToGitHubOwnerDefault: ``,
        includeIssuesDefault: true,
        includePullRequestsDefault: true,
        refreshRateInMinutesDefault: `30`,
    }
}

const getSettings = async () =>{

    console.log("get settings");

    const result = await chrome.storage.local.get([`settings`]);

    if(arrayIsNullOrEmpty(result) || isNullOrEmpty(result[`settings`])){
        return result[`settings`];
    }

    return null;
}

const saveInitialSettings = async () => {

    const cachedSettings = await getSettings();

    if(cachedSettings){

        console.log("cached settings");
        return;
    }

    const initialSettings = getInitalSettings();

    await chrome.storage.local.set({
        [`settings`]: initialSettings,
        [`applied-theme`]:initialSettings.theme
    });
}


browser.runtime.onInstalled.addListener(async (details) => {

    console.log("On Installed")
    
    if (details.reason !== "install" && details.reason !== "update") return;

    await saveInitialSettings();
});

export { saveInitialSettings, getSettings, getInitalSettings}