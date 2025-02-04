
import { arrayIsEmpty} from "../../js/modules/null.js";
import { createConfigButton } from "./saved-replies-button-element.js";
import { getSharedSavedReplyConfigurationsFromLocalStorage } from "./popup-storage.js";
import { applyCurrentTheme} from "../../js/modules/theme.js";

let configs = [];

const showNoRepliesIfNoConfigs = () =>{
    
    const noRepliesElement = document.querySelector(`.no-replies`);

    const footerContainerElement = document.querySelector(`.footer-container`);

    const savedRepliesListElement = document.querySelector(`.saved-replies-list`);

    if(arrayIsEmpty(configs)){                   

        noRepliesElement.classList.remove(`hide`);            

        savedRepliesListElement.classList.add(`hide`);

    }else{

        noRepliesElement.classList.add(`hide`);       

        savedRepliesListElement.classList.remove(`hide`);
    }
}

const hideConfig = (config) => {
    
    let configElement = document.querySelector(`[data-saved-replies-name="${config.name}"]`);

    configElement.style.display = `none`;
}

const showConfig = (config) => {

    let configElement = document.querySelector(`[data-saved-replies-name="${config.name}"]`);

    configElement.style.display = `block`;
}

const setConfigDisplay = (shouldDisplay,config) => {

    if (shouldDisplay) {

       showConfig(config);

    } else {
       hideConfig(config);
    }
}

const filterItems = (searchValue) => {

    if (arrayIsEmpty(configs)) {
        return;
    }

    for (let config of configs) {

        let matchesSearchValue =
            config.name.includes(searchValue)
            || config.url.includes(searchValue)
            || config.limitToGitHubOwner.includes(searchValue)
            || searchValue === ``;
        
        setConfigDisplay(matchesSearchValue,config);
    }
}

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

    if (confirmation === false) {
        return;
    }

    let configKey = `${name}-config`;

    await chrome.storage.local.remove([configKey]);

    let config = configs.find((config) => config.name === name);

    hideConfig(config);

    configs = configs.filter((config) => config.name !== name);

    showNoRepliesIfNoConfigs();
}

const navigateToSharedSavedReplies = async (url) => {

    chrome.tabs.create({
        url: url
    })
}

const loadItems = async () => {

    configs = await getSharedSavedReplyConfigurationsFromLocalStorage();

    const configButtonsContainer = document.querySelector(`.saved-replies-list > div`);

    if (!arrayIsEmpty(configs)) {

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

    showNoRepliesIfNoConfigs();
}

const initialize = async () => {
    const addButtons = document.querySelectorAll(`.add-button`);

    for(var addButton of addButtons){

        addButton.addEventListener(`click`, () => openAddItemPage())
    }
   
    const searchBox = document.querySelector(`.search`);

    searchBox.addEventListener(`keyup`, (event) => filterItems(event.target.value));

    const settingsLink = document.querySelector(`.inner-footer`);

    settingsLink.addEventListener(`click`, async () => await chrome.runtime.openOptionsPage());

    await loadItems();

    console.log("loaded popup");

    await applyCurrentTheme();
}

initialize();