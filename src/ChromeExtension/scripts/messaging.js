
const SERVICE_WORKER = "service-worker";
const OFFSCREEN = "offscreen";
const EVENT = "event";
const COMMAND = "command";
const ERROR = "error";

const isCommand = (message) => message.messageType = COMMAND;

const isEvent = (message) => message.messageType = EVENT;

const canHandleCommand = async = (message, target, messageName) => {
  
    if(!message){
        throw new Error(`message is required when calling canHandleCommand`)
    }

    if(!target){
        throw new Error(`target is required when calling canHandleCommand`)
    }


    if(!messageName){
        throw new Error(`messageName is required when calling canHandleCommand`)
    }
    

    if(isCommand(message)
        && message.target === target
        && message.messageName == messageName){
            console.log(`handling command`, {message});

            return true;
        }

        return false;
}

const canHandleEvent = async (message, messageName) => {
    
    if(!message){
        throw new Error(`message is required when calling canHandleEvent`)
    }

    if(!messageName){
        throw new Error(`messageName is required when calling canHandleEvent`)
    }
    
    if(isEvent(message)
        && message.messageName === messageName){
        console.log(`handling event`, message);
    }
}

const createCommand = (messageName, target, data) => {

    if(!messageName){
        throw new Error(`messageName is required when calling createCommand`)
    }

    if(!target){
        throw new Error(`target is required when calling createCommand`)
    }


    if(!data){
        throw new Error(`data is required when calling createCommand`)
    }
    
    return {
        messageType: COMMAND,
        messageName: messageName,
        target: target,
        data: data
    }
};

const send = async (command) => {

    if (isCommand(command)) {

        console.log(`sent`, command);
        
        return await chrome.runtime.sendMessage(command);
    }
    else {
        throw new Error(`message: ${command.messageName} is not a command.`);
    }
}

const createEvent = (messageName, data) => {

    if(!messageName){
        throw new Error(`messageName is required when calling createEvent`)
    }

    if(!data){
        throw new Error(`data is required when calling createEvent`)
    }

    return {
        messageType: EVENT,
        messageName: messageName,
        data: data
    }
};

const publish = async (event) => {

    if (isEvent(event)) {
        
        console.log(`published`, event);

        return await chrome.runtime.sendMessage(event);
    }
    else {

        throw new Error(`message: ${event.messageName} is not a event.`);
    }
}

const sendUpdateSavedRepliesUrlCommand = async (savedRepliesUrl) => {

    const updateSavedRepliesUrlCommand = createCommand(`updateSavedRepliesUrl`, SERVICE_WORKER, savedRepliesUrl);

    await send(updateSavedRepliesUrlCommand);
}

const handleUpdateSavedRepliesUrlCommand = async (message, target, handleUpdateSavedRepliesUrl) => {

    if (!canHandleCommand(message, target, `updateSavedRepliesUrl`)) {
        return;
    }

    return await handleUpdateSavedRepliesUrl(message.data);
}

const publishSavedRepliesUrlChangedEvent = async (savedRepliesUrl) => {

    const savedRepliesUrlChangedEvent =
        createEvent(`savedRepliesUrlChanged`, savedRepliesUrl);

    await publish(savedRepliesUrlChangedEvent);
}

const handleSavedRepliesUrlChangedEvent = async (message,handleSavedRepliesUrlChanged) =>{
    if(!canHandleEvent(message, `savedRepliesUrlChanged`)){
        return;
    }

    return await handleSavedRepliesUrlChanged(message.data);
}

const sendFetchSavedRepliesFromUrlCommand = async (savedRepliesUrl) => {

    const fetchSavedRepliesFromUrlCommand =
        createCommand("fetchSavedRepliesFromUrl", OFFSCREEN, savedRepliesUrl);

    await send(fetchSavedRepliesFromUrlCommand);
}

const handleFetchSavedRepliesFromUrlCommand = async (message, handleFetchSavedRepliesFromUrl) => {

    if (!canHandleCommand(message, OFFSCREEN, `fetchSavedRepliesFromUrl`)) {
        return;
    }

    await handleFetchSavedRepliesFromUrl(message.data);
}

const sendStoreSavedRepliesCommand = async (savedReplies) => {

    const storeSavedRepliesCommand =
        createCommand(`storeSavedReplies`, SERVICE_WORKER, savedReplies)

    await send(storeSavedRepliesCommand);
}

const handleStoreSavedRepliesCommand = async (message, target, handleStoreSavedReplies) => {

    if (!canHandleCommand(message, target, `storeSavedReplies`)) {
        return;
    }

    await handleStoreSavedReplies(message.data);
}

const publishFailedToFetchSavedRepliesEvent = async (error) => {
    
    const failedToFetchSavedRepliesFromUrlEvent = 
        createEvent(`failed-to-create-saved-replies-from-url`, error.message);

    await publish(failedToFetchSavedRepliesFromUrlEvent);
}

const handleFailedToFetchSavedRepliesEvent = async (message, handleFailedToFetchSavedReplies) => {
    
    if(!canHandleEvent(message, `failed-to-create-saved-replies-from-url`)){
        return 
    }

    try{
    await handleFailedToFetchSavedReplies(message.data);
    }
    catch(error){
        console.log(`swallowing error` );
    }
}