const getSavedRepliesUrlFromLocalStorage = async () => {
    const data = await chrome.storage.local.get(["saved-replies-url"]);

    let savedReplyUrl = data[`saved-replies-url`];

    console.log(`got url ${savedReplyUrl} from local storage`);

    return savedReplyUrl;
}

const getSavedRepliesFromLocalStorage = async () => {

    const replies = await chrome.storage.local.get(["saved-replies"]);

    if (replies) {
        console.log("got replies from local storage");
    }

    return replies["saved-replies"];
}

const getSavedRepliesLastUpdatedAtFromLocalStorage = async () => {
    
    const data = await chrome.storage.local.get(["saved-replies-last-updated-at"]);   
    
    let lastUpdatedAt = data[`saved-replies-last-updated-at`];

    return lastUpdatedAt;
}