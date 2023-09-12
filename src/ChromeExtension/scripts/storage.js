const addSavedRepliesToLocalStorage = async (savedReplies) => {
    try {

        await chrome.storage.local.set({"saved-replies" : savedReplies });

        console.log("saved replies local storage updated");
    }
    catch (error) {
        console.log("error adding saved replies to local storage", error);
    }
}

const getSavedRepliesFromLocalStorage = async () => {

    try {

        const replies = await chrome.storage.local.get(["saved-replies"]);

        if(replies){
            console.log("got replies from local storage");
        }
        
        return replies["saved-replies"];
    }
    catch (error) {
        console.log("error getting saved replies from local storage", error);
    }

    return null;
}

const getSavedReplies = async (useCache = false) => {
    try {

        if(useCache === true) {

            const cachedSavedReplies = await getSavedRepliesFromLocalStorage();
            
            if (cachedSavedReplies) {

                return cachedSavedReplies;
            }
        }
        
        return await updateSavedReplies();
    }
    catch (error) {
        console.log("error getting saved replies", error)
    }

    return null;
}

const getSavedRepliesFromGitHub = async () => {
    
    try {
        // const savedReplyTemplatesUrl = "https://github.com/Particular/StaffSuccess/blob/master/github/saved-reply-templates.md";

        const savedReplyTemplatesUrl = getTemplateDataUrl();

        const response = await fetch(savedReplyTemplatesUrl);

        console.log("response",response);
        
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
            replies.push({name: replayNames[i], body: replyBodies[i]})
        }
        
        return replies;
    }
    catch(error){
        console.error("error getting saved replies from GitHub", error);
    }

    return [];
}

const updateSavedReplies = async () => {
    
    try{
        const savedReplies = await getSavedRepliesFromGitHub();
    
        await addSavedRepliesToLocalStorage(savedReplies);
        
        return savedReplies;
    }
    catch(error){
        console.error("Error caching saved replies",error);
    }
}
