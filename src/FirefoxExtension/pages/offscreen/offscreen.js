
import { fetchSavedRepliesFromUrl } from "../../js/modules/fetch-saved-replies.js";
import { handleUpdateSharedSavedRepliesCommand, sendSaveSharedSavedRepliesCommand } from "./offscreen-messaging.js";

chrome.runtime.onMessage.addListener( async (request, sender, sendResponse) => {

    await handleUpdateSharedSavedRepliesCommand(
        request,       
        async (name,url) => {
            try {                                    

                console.log("offscreen-savedRepliesUrl", url);

                const replies = await fetchSavedRepliesFromUrl(url);
    
                await sendSaveSharedSavedRepliesCommand(name, replies);    
            }
            catch (error){                
                
                console.log("offscreen",error);               
            }

            return true;
    }); 
    
    return true;
});