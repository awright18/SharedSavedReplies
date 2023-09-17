const LOCAL = "local";

const addSavedRepliesUrlToLocalStorage = async (savedRepliesUrl) => {
    await chrome.storage.local.set({"saved-replies-url": savedRepliesUrl});

    console.log(`saved replies Url ${savedRepliesUrl} updated in local storage`);
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

const handleSavedRepliesUrlStorageChangedEvent =
    async (changes, namespace, eventHandler ) => {

    console.log(`changes`, changes);

    const newSavedRepliesUrl = changes[`saved-replies-url`]
    
    if(newSavedRepliesUrl && namespace === LOCAL){

        await eventHandler(newSavedRepliesUrl[`newValue`]);
    }                
}

const handleSavedRepliesStorageChangedEvent =
    async (changes, namespace, eventHandler ) => {

    const newSavedReplies = changes[`saved-replies`];

    if(newSavedReplies && namespace === LOCAL){
        
        await eventHandler(newSavedReplies[`newValue`]);
    }
}