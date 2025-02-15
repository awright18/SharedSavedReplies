
let savedRepliesVisible = false;
let savedRepliesButtonIsDragging = false;
let savedRepliesButtonOffsetX, savedRepliesButtonOffsetY;

const createShowSavedRepliesButton = () => {
   
    const iconUrl = chrome.runtime.getURL("pages/sidepanel/saved-replies-icon.svg");
   
    const showSavedReliesButton = createElement("div",{
        children:[
            createElement("div", {
                children:[
                    createElement("img",{
                        children:[],
                        className:"show-saved-replies-icon-button",
                        src:iconUrl
                    })
                ],
                type:"button",
                style:`background-color: transparent;
                       background-repeat: no-repeat;
                       border: none;`
            })],
        className:"show-saved-replies-button-container"
    });

    return showSavedReliesButton;
}
   
const addShowSavedRepliesClickHandler = (showSavedRepliesButton) =>{
    
    showSavedRepliesButton.addEventListener(`click`, () =>{
    
        if(!savedRepliesVisible){
            const openSavedRepliesPanelMessage = "OpenSharedSavedRepliesPanel";

            const openSharedSavedRepliesPanelCommand = 
                createCommand(openSavedRepliesPanelMessage, SERVICE_WORKER, {});

            sendNonAsync(openSharedSavedRepliesPanelCommand);

            savedRepliesVisible = true;
        } else{
            const closeSavedRepliesPanelMessage = "CloseSharedSavedRepliesPanel";

            const closeSharedSavedRepliesPanelCommand = 
                createCommand(closeSavedRepliesPanelMessage, SIDE_PANEL, {});
    
            sendNonAsync(closeSharedSavedRepliesPanelCommand);  

            savedRepliesVisible = false;
        } 
    }) 
}



