chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {


    await handleFetchSavedRepliesFromUrlCommand(
        request,       
        async (savedRepliesUrl2) => {
            try {

                console.log("offscreen-savedRepliesUrl", savedRepliesUrl2);

                const savedReplies2 = await fetchSavedRepliesFromUrl(savedRepliesUrl2);
    
                await sendStoreSavedRepliesCommand(savedReplies2);

                await closeOffscreenDocument();
            }
            catch (error){                
                
                console.log("offscreen",error);
                // await publishFailedToFetchSavedRepliesEvent(error);
                sendResponse(error);
            }
    });    
});