
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    
    handleCloseSharedSavedRepliesPanel(request, () => {
       
        if(window !== undefined){

            window.close();
        }
    });
});

//update url for actviated tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.active) {
        
        const canLoadReplies = await canLoadSavedRepliesForURL(tab.url);

        if(!canLoadReplies){
            
            if(window !== undefined){

                window.close();
            }
        }

    }
});
  
//   //update current url for updated tab when url in a tab changes
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.active) {
      
        const canLoadReplies = await canLoadSavedRepliesForURL(tab.url);

        if(!canLoadReplies){
            
            if(window !== undefined){

                window.close();
            }
        }
    }
});

document.onreadystatechange = async function() {
   
    if (document.readyState === "complete") {
         
        (async () => {
            const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

            const currentActiveUrl = await getCurrentActiveURL();

            const repliesUi = await prepareRepliesUI(currentActiveUrl);
    
            const sharedSavedRepliesDiv = document.querySelector(`#SharedSavedReplies`);
            
            console.log("shared saved replies div",sharedSavedRepliesDiv);
    
            console.log("repliesUl", repliesUi);

            sharedSavedRepliesDiv.append(repliesUi);

            let copyButtons = document.querySelectorAll(".saved-replies-copy-button");

            copyButtons.forEach(
                (button) => 
                    button.addEventListener("click", copySavedReplyTemplate));

            let expandButtons = document.querySelectorAll(".saved-replies-expand-button");

            expandButtons.forEach(
                    (button) => 
                        button.addEventListener("click", toggleTemplateVisibility));

            let searchElement = document.querySelector(`.search`);

            searchElement.addEventListener(`keyup`, onfilterVisibleSavedReplies);

            let clearTextIcon = document.querySelector(".clear-text-icon");

            clearTextIcon.addEventListener(`click`, clearSearch);

            await applyCurrentTheme();
        })()
        
    }
}




