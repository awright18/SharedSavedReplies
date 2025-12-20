import { getCurrentActiveURL } from "../../js/modules/urls.js";
import { prepareRepliesUI } from "../../js/modules/sidepanel.js";
import { copySavedReplyTemplate, toggleTemplateVisibility, onfilterVisibleSavedReplies, clearSearch } from "../../js/modules/saved-replies-items.js";

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

        })()
        
    }
}




