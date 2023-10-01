const SERVICE_WORKER = "service-worker";

const handleSaveSharedSavedRepliesCommand = async (message, handleMessage) => {

    if (!canHandleCommand(message, SERVICE_WORKER, `SaveSharedSavedReplies`)) {
        return;
    }

    await handleMessage(message.data.name, message.data.replies);
}