
const sendUpdateSavedRepliesUrlMessage = async (savedRepliesUrl) => {
    return await chrome.runtime.sendMessage({
        messageType: "updateSavedRepliesUrl",
        savedRepliesUrl: savedRepliesUrl
    });
}

const handleUpdateSavedRepliesUrlMessage = async (message, handleUpdateSavedRepliesUrl) => {
   
    if(message.messageType === "updateSavedRepliesUrl") {
        return await handleUpdateSavedRepliesUrl(message.savedRepliesUrl);
    }
}

const sendUpdateSavedRepliesMessage = async () => {
    return await chrome.runtime.sendMessage({
        messageType: "updateSavedReplies"
    });
}

const handleUpdateSavedRepliesMessage = async (message, handleUpdateSavedReplies) => {
    if(message.messageType === "updateSavedReplies") {
        return await handleUpdateSavedReplies();
    }
}
