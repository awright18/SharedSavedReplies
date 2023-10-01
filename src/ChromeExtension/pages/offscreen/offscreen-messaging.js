import { canHandleCommand, createCommand, send } from "../../js/modules/messaging.js";

const OFFSCREEN = "offscreen";
const SERVICE_WORKER = "service-worker";

const handleUpdateSharedSavedRepliesCommand = async (message, handleMessage) => {
    if (!canHandleCommand(message, OFFSCREEN, `UpdateSharedSavedReplies`)) {
        return;
    }

    await handleMessage(message.data.name, message.data.url);
}

const sendSaveSharedSavedRepliesCommand = async (name, sharedSavedReplies) => {

    const command =
        createCommand(
            `SaveSharedSavedReplies`,
            SERVICE_WORKER,
            {
                name: name,
                replies: sharedSavedReplies
            });

    await send(command);
}

export { handleUpdateSharedSavedRepliesCommand, sendSaveSharedSavedRepliesCommand}