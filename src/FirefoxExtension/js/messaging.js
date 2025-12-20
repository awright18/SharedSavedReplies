const EVENT = "event";
const COMMAND = "command";

const isCommand = (message) => message.messageType = COMMAND;

const isEvent = (message) => message.messageType = EVENT;

const canHandleCommand = (message, target, messageName) => {

    if (!message) {
        throw new Error(`message is required when calling canHandleCommand`)
    }

    if (!target) {
        throw new Error(`target is required when calling canHandleCommand`)
    }


    if (!messageName) {
        throw new Error(`messageName is required when calling canHandleCommand`)
    }


    if (isCommand(message)
        && message.target === target
        && message.messageName == messageName) {
        console.log(`handling command`, { message });

        return true;
    }

    return false;
}

const canHandleEvent = async (message, messageName) => {

    if (!message) {
        throw new Error(`message is required when calling canHandleEvent`)
    }

    if (!messageName) {
        throw new Error(`messageName is required when calling canHandleEvent`)
    }

    if (isEvent(message)
        && message.messageName === messageName) {
        console.log(`handling event`, message);
        
        return true;
    }

    return false;
}

const createCommand = (messageName, target, data) => {

    if (!messageName) {
        throw new Error(`messageName is required when calling createCommand`)
    }

    if (!target) {
        throw new Error(`target is required when calling createCommand`)
    }


    if (!data) {
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

        await chrome.runtime.sendMessage(command);

        return true;
    }
    else {
        throw new Error(`message: ${command.messageName} is not a command.`);
    }
}

const sendNonAsync = (command) => {

    if (isCommand(command)) {

        console.log(`sent`, command);

        chrome.runtime.sendMessage(command);

        return true;
    }
    else {
        throw new Error(`message: ${command.messageName} is not a command.`);
    }
}

const createEvent = (messageName, data) => {

    if (!messageName) {
        throw new Error(`messageName is required when calling createEvent`)
    }

    if (!data) {
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

        await chrome.runtime.sendMessage(event);

        return true;
    }
    else {

        throw new Error(`message: ${event.messageName} is not a event.`);
    }
}

const tryPublish = async (event) =>{
    try{
       await publish(event);
    }
    catch(error){
        console.log(error.message);
    }
}

const trySendMessageToContentScript =  async (tabId, event) =>{
    try{
        chrome.tabs.sendMessage(tabId, event);
    }
    catch(error){
        console.log("Failed to send to message to content script",error.message);
    }
}