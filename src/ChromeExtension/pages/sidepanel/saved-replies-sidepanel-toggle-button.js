
let savedRepliesVisible = false;
let savedRepliesButtonIsDragging = false;
let savedRepliesButtonOffsetX, savedRepliesButtonOffsetY;

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
        className:"show-saved-replies-button-container",
        style:`position:fixed;z-index:9999;bottom:50%; 
               right:50px;
               cursor: move;
               `
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


const addShowSavedRepliesMouseMoveHandlers = (showSavedRepliesButton) =>{
    
    showSavedRepliesButton.addEventListener(`click`, (event) =>{
        if( savedRepliesButtonIsDragging){
            savedRepliesButtonIsDragging = false;
        }else{
            savedRepliesButtonIsDragging = true;
            savedRepliesButtonOffsetX = event.clientX - showSavedRepliesButton.offsetLeft;
            savedRepliesButtonOffsetY = event.clientY - showSavedRepliesButton.offsetTop;
        }
    });


    showSavedRepliesButton.addEventListener(`scroll`, (event) =>{
        if (savedRepliesButtonIsDragging) {
            showSavedRepliesButton.style.left = (event.clientX - savedRepliesButtonOffsetX) + 'px';
            showSavedRepliesButton.style.top = (event.clientY - savedRepliesButtonOffsetY) + 'px';
          }
    });

//     showSavedRepliesButton.addEventListener(`mouseup`,(event) => {
//         savedRepliesButtonIsDragging = false;
//         //save position to storage
//     });
 }




