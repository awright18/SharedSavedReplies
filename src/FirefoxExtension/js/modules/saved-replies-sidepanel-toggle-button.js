import { createElement } from "./create-element.js";

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
                       border: none;`,
                onclick:"browser.sidebarAction.toggle();"
            })],
        className:"show-saved-replies-button-container"
    });

    return showSavedReliesButton;
}
   
const addShowSavedRepliesClickHandler = (showSavedRepliesButton) =>{
    
    showSavedRepliesButton.addEventListener(`click`, () =>{
        
        browser.actionbar.toggle();
    }) 
}

export {createShowSavedRepliesButton, addShowSavedRepliesClickHandler};

