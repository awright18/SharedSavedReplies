import { isNullOrEmpty, arrayIsNullOrEmpty } from "../../js/modules/null.js";
import { setupValidation, validateForm } from "./shared-saved-replies-form.validation.js";
import { getSettings } from "../../js/modules/settings.js";
import { applyCurrentTheme } from "../../js/modules/theme.js";


const getFromLocalStorage = async (name) => {

    const configKey = `${name}-config`;

    const result = await chrome.storage.local.get([configKey]);

    const config = result[configKey];

    if(arrayIsNullOrEmpty(result) || isNullOrEmpty(config)){
        
        return null;
    }

    return config;
}

const saveToLocalStorage = async (values) => {

    if (isNullOrEmpty(values)) {
        throw new Error("Cannot save null or empty shared saved replies.");
    }

    const configKey = `${values.name}-config`;    

    await chrome.storage.local.set({ [configKey]: values, });
}

const getFormValues = () => {

    return {
        url: document.getElementById(`url`).value,
        name: document.getElementById(`name`).value,
        allowEverywhere: document.getElementById(`allowEverywhere`).checked,
        limitToGitHubOwner: document.getElementById('limitToGitHubOwner').value,
        includeIssues: document.getElementById(`includeIssues`).checked,
        includePullRequests: document.getElementById(`includePullRequests`).checked,
        refreshRateInMinutes: document.getElementById(`refreshRateInMinutes`).value       
    };
}

const setFormValues = (values) => {

    document.getElementById(`url`).value = values?.url ?? '' ;
    document.getElementById(`name`).value = values?.name ?? '' ;
    document.getElementById(`allowEverywhere`).checked = values?.allowEverywhere;
    document.getElementById('limitToGitHubOwner').value = values?.limitToGitHubOwner;
    document.getElementById(`includeIssues`).checked = values?.includeIssues;
    document.getElementById(`includePullRequests`).checked = values?.includePullRequests;
    document.getElementById(`refreshRateInMinutes`).value = Number(values?.refreshRateInMinutes);
}

const close = async () => {

    await chrome.tabs.getCurrent((tab) => chrome.tabs.remove(tab.id));
}

const save = async () => {

    const formIsValid = await validateForm();

    if (formIsValid) {

        const formValues = getFormValues();

        await saveToLocalStorage(formValues);
        
        console.log("save config");

        await chrome.tabs.getCurrent(function (tab) {
            chrome.tabs.remove(tab.id, function () { });
        });

        
    } else {
        
        console.log("invalid config");
    }
}

const loadForm = async () => {

    let editting = false;

    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('name');

    if(name){
        editting = true;
    }

    let settings = await getSettings();

    console.log(`settings`,settings);

    const localStorageValues = await getFromLocalStorage(name);

    if(localStorageValues){
               
        settings = localStorageValues;
    }

    const headerTitleElement = document.querySelector(`.dialogHeaderTitle`);

    if (localStorageValues?.name) {

        headerTitleElement.innerText = "Edit Saved Replies";
       
    } else {

        headerTitleElement.innerText = "Add Saved Replies";       
    }

    console.log(`settings`,settings);

    setFormValues(settings);

    setupValidation(editting);

    document.getElementById(`close`)
        .addEventListener(`click`, async () => await close());

    document.getElementById(`cancel`)
        .addEventListener(`click`, async () => await close());

    document.getElementById(`save`)
        .addEventListener(`click`, async () => await save());

    await applyCurrentTheme();
}

await loadForm();
