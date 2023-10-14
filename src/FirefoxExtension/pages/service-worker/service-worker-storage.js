import { isNullOrEmpty } from "../../js/modules/null.js";
import { utcNowTicks } from "../../js/modules/time.js";

const getConfigFromLocalStorage = async (name) => {
    
    const configKey = `${name}-config`;

    const result = await chrome.storage.local.get([configKey]);

    const config = result[configKey];

    return config;
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

    if (!isNullOrEmpty(result)) {
        repliesIndex = result[repliesIndexKey];
    }

    if (!repliesIndex.includes(name)) {
        repliesIndex.push(name)
    }

    await chrome.storage.local.set({ [repliesIndexKey]: repliesIndex });
}

const saveRepliesInLocalStorage = async (name, sharedSavedReplies) => {

    if (isNullOrEmpty(sharedSavedReplies)) {
        return;
    }

    await updateRepliesIndex(name);

    const repliesKey = `${name}-replies`;

    const lastUpdatedKey = `${name}-lastupdated`;

    const lastUpdatedAt = utcNowTicks();

    //update the last updated time for shared saved replies

    await chrome.storage.local.set({
        [repliesKey]: sharedSavedReplies,
        [lastUpdatedKey]: lastUpdatedAt
    });
}

const removeDataFromLocalStorage = async (name) => {

    let repliesKey = `${name}-replies`;

    let lastUpdatedKey = `${name}-lastupdated`;

    let indexKey = `replies-index`;

    let indexResult = await chrome.storage.local.get(indexKey);

    let repliesIndex = indexResult[indexKey];

    if (repliesIndex) {
        repliesIndex = repliesIndex.filter((value) => value !== name);

        await chrome.storage.local.set({ [indexKey]: repliesIndex });
    }

    await chrome.storage.local.remove([repliesKey, lastUpdatedKey]);
}

export { removeDataFromLocalStorage, saveRepliesInLocalStorage, updateRepliesIndex, getConfigFromLocalStorage, getUrlForShareSavedRepliesName }