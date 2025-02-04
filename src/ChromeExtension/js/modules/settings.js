import { arrayIsNullOrEmpty, isNullOrEmpty } from "./null.js";

const getSettings = async () => {

    const result = await chrome.storage.local.get([`settings`]);

    const settings = result[`settings`];

    if(arrayIsNullOrEmpty(result) || isNullOrEmpty(settings)){
        
        throw new Error(`failed to retrieve settings`);
    }

    return {       
        theme: settings.theme,
        enableDarkMode: settings.enableDarkMode,
        allowEverywhere: settings.allowEverywhereDefault,
        limitToGitHubOwner: settings.limitToGitHubOwnerDefault,
        includeIssues: settings.includeIssuesDefault,
        includePullRequests: settings.includePullRequestsDefault,
        refreshRateInMinutes: settings.refreshRateInMinutesDefault
    }
}

const saveSettings = async (settings) => {

    if(isNullOrEmpty(settings)){

        throw new Error(`When saving settings must have values.`);        
    }
   
    await chrome.storage.local.set({
        [`settings`]: settings,
        [`applied-theme`]:settings.theme,
        [`enable-dark-mode`]:settings.enableDarkMode
    });
}

export { getSettings, saveSettings }
