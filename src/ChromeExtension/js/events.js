const CAN_LOAD_SAVED_REPLIES_CHANGED = "CanLoadSavedRepliesChanged";

const createCanLoadSavedRepliesChangedEvent = (canLoadSavedReplies) => 
    createEvent(CAN_LOAD_SAVED_REPLIES_CHANGED, {canLoadSavedReplies:canLoadSavedReplies});