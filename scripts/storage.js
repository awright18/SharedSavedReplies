const addSavedRepliesToLocalStorage = async (savedReplies) => {
    try {

        await chrome.storage.local.set({"saved-replies" : savedReplies });      
    }
    catch (error) {
        console.log("error adding saved replies to local storage", error);
    }
}

const getSavedRepliesFromLocalStorage = async () => {

    try {

        const replies = await chrome.storage.local.get(["saved-replies"]);

        return replies["saved-replies"];
    }
    catch (error) {
        console.log("error getting saved replies from local storage", error);
    }

    return null;
}

const getSavedReplies = async (useCache = false) => {
    try {

        const cachedSavedReplies = await getSavedRepliesFromLocalStorage();

        if (cachedSavedReplies && useCache === true) {    

            return cachedSavedReplies;
        }

        const gitHubSavedReplies = await getSavedRepliesFromGitHub();
    
        await addSavedRepliesToLocalStorage(gitHubSavedReplies);

        return gitHubSavedReplies;
    }
    catch (error) {
        console.log("error getting saved replies",error)
    }

    return null;
}

const getSavedRepliesFromGitHub = async () => {

    const savedReplyTemplatesUrl = "https://github.com/Particular/StaffSuccess/blob/master/github/saved-reply-templates.md";

    const response = await fetch(savedReplyTemplatesUrl);

    const json = await response.json();

    const html = json.payload.blob.richText;

    var parser = new DOMParser();

    var doc = parser.parseFromString(html, "text/html");

    var replayNameH2s = Array.from(doc.querySelectorAll("h2[tabindex='-1']"))
    replayNameH2s.shift();
    var replayNames = replayNameH2s.map(e => e.innerText);

    var replyPreElements = Array.from(doc.querySelectorAll("h2[tabindex='-1'] ~ .highlight > pre"));

    var replyBodies = replyPreElements.map(e => e.innerText);

    var replies = [];

    for (let i = 0; i < replyBodies.length; i++) {
        replies.push({ name: replayNames[i], body: replyBodies[i] })
    }

    return replies;
}

const updateSavedReplies = async () => {
    
    try{
        const savedReplies = await getSavedRepliesFromGitHub();
    
        await addSavedRepliesToLocalStorage(savedReplies);

        console.log("saved replies updated");
    }
    catch(error){
        console.log("Error caching saved replies",error);
    }
}
