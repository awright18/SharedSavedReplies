const clearAlarm = async (name) => {    
    await chrome.alarms.clear(name);
}
