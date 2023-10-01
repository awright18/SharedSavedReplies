
const getMatchingSavedReplyConfigsFromLocalStorage = async () => {

    const results = await chrome.storage.local.get();

    const resultsArray = Object.entries(results);

    let configExpression = new RegExp(".+-config")

    let replies = [];

    for(let result of resultsArray)
    {
        if (configExpression.test(result[0])) {

            const config = result[1];

            if (canLoadRepliesForUrl(config)) {

                const configKey = `${config.name}-replies`;

                const repliesResult = await chrome.storage.local.get([configKey]);

                let configReplies = repliesResult[configKey];

                replies = replies.concat(configReplies)
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

const getSavedRepliesLastUpdatedAtFromLocalStorage = async () => {

    const results = await chrome.storage.local.get();

    const resultsArray = Object.entries(results);

    let configExpression = new RegExp(".+-config")

    let currentLastUpdatedAt = utcStartTicks();

    const lastUpdatedAt = resultsArray.reduce(async (updates, result) => {

        if (configExpression.test(result[0])) {

            let config = result[1];
            if (canLoadRepliesForUrl(config)) {

                let nextLastUpdatedAt = await getSavedRepliesLastUpdatedAt(config.name);

                if (dateIsBefore(currentLastUpdatedAt, nextLastUpdatedAt)) {
                    currentLastUpdatedAt = nextLastUpdatedAt;
                }
            }
        }
        return currentLastUpdatedAt;
    }, currentLastUpdatedAt);

    return lastUpdatedAt;
}
