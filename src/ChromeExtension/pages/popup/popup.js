
import { createConfigButton } from "./saved-replies-button-element.js";
import { getSharedSavedReplyConfigurationsFromLocalStorage } from "./popup-storage.js";

const openEditItemPage = (name) => {

    chrome.tabs.create({
        url: `pages/shared-saved-replies-form/shared-saved-replies-form.html?name=${name}`
    });
}

const openAddItemPage = async () => {

    //open a tab to create a new shared saved reply
    chrome.tabs.create({
        url: `pages/shared-saved-replies-form/shared-saved-replies-form.html`
    })
}

const deleteItem = async (name) => {
    let confirmation = window.confirm(`Do you want to delete the ${name} save replies?`);

    if(confirmation === false){
        return;
    }

    let configKey = `${name}-config`;
    let repliesKey = `${name}-replies`;
    let lastUpdatedKey = `${name}-lastupdated`;

    let indexKey = `replies-index`;
       
    let indexResult = await chrome.storage.local.get(indexKey);

    let repliesIndex = indexResult[indexKey];
        
    if(repliesIndex){
        repliesIndex = repliesIndex.filter((value) => value !== name );
        
        await chrome.storage.local.set({[indexKey] : repliesIndex});
    }     
    
    await chrome.storage.local.remove([configKey,repliesKey,lastUpdatedKey]);

    await loadItems();
}

const navigateToSharedSavedReplies = async (url) => {

    chrome.tabs.create({
        url: url
    })
}

const loadItems = async () => {

    const addButton = document.querySelector(`.add-button`);

    addButton.addEventListener(`click`, () => openAddItemPage())

    const configs = await getSharedSavedReplyConfigurationsFromLocalStorage();

    const configButtonsContainer = document.querySelector(`.saved-replies-list > div`);

    if (configs) {

        for (const config of configs) {

            const configButtonElement = createConfigButton(config);

            const openSavedRepliesButtonElement = configButtonElement.querySelector(`.saved-replies-button`);

            openSavedRepliesButtonElement.addEventListener(`click`, 
                async () => await navigateToSharedSavedReplies(config.url));
            
            const editItemButton = configButtonElement.querySelector(`.saved-replies-edit-button`);

            editItemButton.addEventListener(`click`,
                async () => await openEditItemPage(config.name));

            const deleteItemButton = configButtonElement.querySelector(`.saved-replies-delete-button`); 

            deleteItemButton.addEventListener(`click`,
                async () => await deleteItem(config.name));

            configButtonsContainer.appendChild(configButtonElement);
        }
    }
}

loadItems();