const createShowSavedRepliesButton = () =>
    createElement("div",{
        children:[
            createElement("button", {
                children:["Show Saved Replies"],
                "type":"button"
            })],
        style:"position:sticky;top:50vh;right:0;"
    });
   
const addShowSavedRepliesClickHandler = (showSavedRepliesButton) =>{
    showSavedRepliesButton.addEventListener(`mousedown`, () =>{
    
        const openSavedRepliesPanelMessage = "OpenSharedSavedRepliesPanel";

        const openSharedSavedRepliesPanelCommand = 
            createCommand(openSavedRepliesPanelMessage, SERVICE_WORKER, {});

        sendNonAsync(openSharedSavedRepliesPanelCommand);      
    }) 
}

const createHideSavedRepliesButton = () =>
    createElement("div",{
        children:[
            createElement("button", {
                children:["Hide Saved Replies"],
                "type":"button"
            })],
        style:"position:sticky;top:50vh;left:160;"
    });
   
const addHideSavedRepliesClickHandler = (hideSavedRepliesButton) =>{
    hideSavedRepliesButton.addEventListener(`mousedown`, () =>{
    
        const closeSavedRepliesPanelMessage = "CloseSharedSavedRepliesPanel";

        const closeSharedSavedRepliesPanelCommand = 
            createCommand(closeSavedRepliesPanelMessage, SIDE_PANEL, {});

        sendNonAsync(closeSharedSavedRepliesPanelCommand);      
    }) 
}



