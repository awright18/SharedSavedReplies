const getSharedSavedReplyConfigurationsFromLocalStorage = async () => {

    const results = await chrome.storage.local.get();

    const resultsArray = Object.entries(results);

    let configExpression = new RegExp(".+-config")

    const replyConfigurations = resultsArray.reduce((configs, result) => {

        if(configExpression.test(result[0])){
            
            configs.push(result[1]);
        }

        return configs;
    },[]);

    return replyConfigurations;
}

export { getSharedSavedReplyConfigurationsFromLocalStorage }