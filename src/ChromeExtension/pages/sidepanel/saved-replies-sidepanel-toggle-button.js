
let savedRepliesVisible = false;

const createShowSavedRepliesButton = () => {
   
    const iconUrl = chrome.runtime.getURL("pages/sidepanel/saved-replies-icon.svg");
   
    const showSavedReliesButton = createElement("div",{
        children:[
            createElement("button", {
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
        style:`position:fixed;z-index:9999;bottom:50%; 
               right:50px;
               cursor: move;
                
               `
    });

    return showSavedReliesButton;
}
   
const addShowSavedRepliesClickHandler = (showSavedRepliesButton) =>{
    
    showSavedRepliesButton.addEventListener(`mousedown`, () =>{
    
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



