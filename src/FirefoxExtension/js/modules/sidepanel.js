import { canHandleCommand, createCommand, sendNonAsync } from "./messaging.js";
import {getMatchingSavedReplyConfigsFromLocalStorage} from "./saved-replies-storage.js";
import { arrayIsNotEmpty } from "./null.js";
import { createSavedRepliesSidePanelDiv } from "./sidepanel-elements.js";

let replies = [];
let repliesExist = false;
let repliesUI = [];

const closeSavedRepliesPanelMessage = "CloseSharedSavedRepliesPanel";

const handleCloseSharedSavedRepliesPanel = (message, handleMessage) =>{

    if (!canHandleCommand(message, SIDE_PANEL, closeSavedRepliesPanelMessage)) {
        return;
    }

    handleMessage();
}

const closeSharedSavedRepliesPanel = () =>{

    const closeSharedReplilesPanelCommand = 
        createCommand(closeSavedRepliesPanelMessage, SIDE_PANEL, {});
    
    sendNonAsync(closeSharedReplilesPanelCommand);
}

const prepareRepliesUI = async(url) => {

    const replies = await getMatchingSavedReplyConfigsFromLocalStorage(url);

    console.log("replies", replies);

    const repliesExist = arrayIsNotEmpty(replies);

    if (repliesExist) {

        const repliesUi = await createSavedRepliesSidePanelDiv(replies);

        return repliesUi;
    }

    return [];
}


export {handleCloseSharedSavedRepliesPanel, closeSharedSavedRepliesPanel, prepareRepliesUI};
