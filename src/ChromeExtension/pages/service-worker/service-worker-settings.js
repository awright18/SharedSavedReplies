const getInitalSettings = () => {
    
    console.log(`initial settings`);

    return {
        theme: `default`,
        allowEverywhereDefault: true,
        limitToGitHubOwnerDefault: ``,
        includeIssuesDefault: true,
        includePullRequestsDefault: true,
        refreshRateInMinutesDefault: `1`,
    }
}

const getSettings = async () =>{
    const result = await chrome.storage.local.get([`settings`]);

    if(arrayIsNullOrEmpty(result) || isNullOrEmpty(result[`settings`])){
        return result[`settings`];
    }

    return null;
}

const saveInitialSettings = async () => {

    const cachedSettings = await getSettings();

    if(cachedSettings){
        return;
    }

    const initialSettings = getInitalSettings();

    await chrome.storage.local.set({
        [`settings`]: initialSettings,
        [`applied-theme`]:initialSettings.theme
    });
}
