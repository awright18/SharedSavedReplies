const isNullOrEmpty = (obj) => {
    
    if(!obj){
        return true;
    }
    
    for(var i in obj){
        return false;
    }

    return true; 
}

const getUrlForShareSavedRepliesName = async (name) => {

    const configKey = `${name}-config`;

    const result = await chrome.storage.local.get([configKey]);

    const config = result[configKey];

    return config?.url;
};


const updateRepliesIndex = async (name) => {

    const repliesIndexKey = "replies-index";

    let result = await chrome.storage.local.get([repliesIndexKey]);

    let repliesIndex = [];  

    if(!isNullOrEmpty(result)){
        repliesIndex = result[repliesIndexKey];
    }

    if(!repliesIndex.includes(name)){
        repliesIndex.push(name)
    }

    await chrome.storage.local.set({[repliesIndexKey] : repliesIndex });
}

const saveSharedSavedReplies = async (name,sharedSavedReplies) => {

    if(isNullOrEmpty(sharedSavedReplies)){
        return;
    }
   
    await updateRepliesIndex(name);

    const repliesKey = `${name}-replies`;

    const lastUpdatedKey = `${name}-lastupdated`;

    const lastUpdatedAt = utcNowTicks();

    //update the last updated time for shared saved replies

    await chrome.storage.local.set({
        [repliesKey] : sharedSavedReplies,
        [lastUpdatedKey] : lastUpdatedAt });
}