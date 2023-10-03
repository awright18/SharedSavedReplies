const addSavedRepliesUrlToLocalStorage = async (savedRepliesUrl) => {
    await chrome.storage.local.set({"saved-replies-url": savedRepliesUrl});

    console.log("saved replies Url updated in local storage");
}

const getSavedRepliesUrlFromLocalStorage = async () => {
    const data = await chrome.storage.local.get(["saved-replies-url"]);

    let savedReplyUrl = data[`saved-replies-url`];

    console.log(`got url ${savedReplyUrl} from local storage`);

    return savedReplyUrl;
}

const addSavedRepliesToLocalStorage = async (savedReplies) => {
    await chrome.storage.local.set({"saved-replies": savedReplies});

    console.log("saved replies local storage updated");
}

const getSavedRepliesFromLocalStorage = async () => {

    const replies = await chrome.storage.local.get(["saved-replies"]);

    if (replies) {
        console.log("got replies from local storage");
    }

    return replies["saved-replies"];
}

const getSavedRepliesFromGitHub = async () => {

    const savedRepliesUrl =
        await getSavedRepliesUrlFromLocalStorage();

    let savedReplies;
    
    if(savedRepliesUrl) {
     savedReplies = await getSavedRepliesFromUrl(savedRepliesUrl);
    }
    
    return savedReplies;
}

