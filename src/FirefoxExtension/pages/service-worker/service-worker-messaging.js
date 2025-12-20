import {canHandleCommand} from "../../js/modules/messaging.js";
import {SERVICE_WORKER} from "../../js/modules/message-receivers.js";

const handleSaveSharedSavedRepliesCommand = async (message, handleMessage) => {

    if (!canHandleCommand(message, SERVICE_WORKER, `SaveSharedSavedReplies`)) {
        return;
    }

    await handleMessage(message.data.name, message.data.replies);
}

const handleOpenSharedSavedRepliesPanel = (message, handleMessage) => {
    
    if (!canHandleCommand(message, SERVICE_WORKER, `OpenSharedSavedRepliesPanel`)) {
        return
    }

    handleMessage(message.windowId);
}

export {handleSaveSharedSavedRepliesCommand, handleOpenSharedSavedRepliesPanel};