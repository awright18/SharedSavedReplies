const handleCanLoadSavedRepliesChanged = async (event, handleEvent) =>{
    if(!canHandleEvent(event, CAN_LOAD_SAVED_REPLIES_CHANGED)){
      return;
    }
    
    if(handleEvent !== undefined){
        handleEvent(event.data.canLoadSavedReplies);
    }
}