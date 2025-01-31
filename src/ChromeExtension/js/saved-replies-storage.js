
const getMatchingSavedReplyConfigsFromLocalStorage = async (url) => {

    console.log("getting matchingconfig from storage");
    console.log("url",url);

    if(url === null){
        url = window.location.href;
    }

    const results = await chrome.storage.local.get();

    const resultsArray = Object.entries(results);

    let configExpression = new RegExp(".+-config")

    let replies = [];

    for(let result of resultsArray)
    {
        console.log("results not empty ");
        
        if (configExpression.test(result[0])) {

            const config = result[1];

            console.log("found matching config");

            if (canLoadRepliesForUrl(config, url)) {

                console.log("can load replies from url");

                const configKey = `${config.name}-replies`;

                const repliesResult = await chrome.storage.local.get([configKey]);

                let configReplies = repliesResult[configKey];

                replies = replies.concat(configReplies)
            }else{
                console.log("can not load replies from url");
            }
        }
    }

    return replies;
}

const getSavedRepliesLastUpdatedAt = async (name) => {

    const lastUpdatedAtKey = `${name}-lastUpdatedAt`;

    const results = await chrome.storage.local.get([lastUpdatedAtKey]);

    const lastUpdateAt = results[lastUpdatedAtKey];

    return lastUpdateAt;
}

const getSavedRepliesLastUpdatedAtFromLocalStorage = async (url) => {

    console.log("getting matchingconfig from storage");
    
    console.log("url",url);

    if(url === null){
        url = window.location.href;
    }

    const results = await chrome.storage.local.get();

    const resultsArray = Object.entries(results);

    let configExpression = new RegExp(".+-config")

    let currentLastUpdatedAt = utcStartTicks();

    for(let result of resultsArray)
    {
        if (configExpression.test(result[0])) {

            let config = result[1];

            if (canLoadRepliesForUrl(config, url)) {

                let nextLastUpdatedAt = await getSavedRepliesLastUpdatedAt(config.name);

                if (dateIsBefore(currentLastUpdatedAt, nextLastUpdatedAt)) {
                    
                    currentLastUpdatedAt = nextLastUpdatedAt;
                }
            }
        }
    }

    return currentLastUpdatedAt;
}
