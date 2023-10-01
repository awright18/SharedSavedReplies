import { setupValidation, validateForm } from "./shared-saved-replies-form.validation.js";

const isEmpty = (obj) => {
    for(var i in obj){
        return false;
    }

    return true; 
}

const createDefaultValues = () => {
    return {
        url: ``,
        name: ``,
        allowEverywhere: true,
        limitToGitHubOwner: ``,
        includeIssues: true,
        includePullRequests: true,
        refreshRate: 1,
        refreshRateInterval: `Hours`
    }
}

const getFromLocalStorage = async (name) => {

    if (!name) {
        return createDefaultValues();
    }

    const configKey = `${name}-config`;

    const result = await chrome.storage.local.get([configKey]);

    const config = result[configKey];

    return config;
}

const saveToLocalStorage = async (values) => {

    if (!values || isEmpty(values) || !values.name) {
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
        refreshRate: document.getElementById(`refreshRate`).value,
        refreshRateInterval: document.getElementById('refreshRateInterval').value
    };
}

const setValues = (values) => {
    console.log(values);
    document.getElementById(`url`).value = values.url;
    document.getElementById(`name`).value = values.name;
    document.getElementById(`allowEverywhere`).checked = values.allowEverywhere;
    document.getElementById('limitToGitHubOwner').value = values.limitToGitHubOwner;
    document.getElementById(`includeIssues`).checked = values.includeIssues;
    document.getElementById(`includePullRequests`).checked = values.includePullRequests;
    document.getElementById(`refreshRate`).value = Number(values.refreshRate);
    document.getElementById('refreshRateInterval').value = values.refreshRateInterval;
}

const close = async () => {

    window.close();
}

const save = async () => {

    if (validateForm()) {

        const formValues = getFormValues();

        await saveToLocalStorage(formValues);

        await chrome.tabs.getCurrent(function (tab) {
            chrome.tabs.remove(tab.id, function () { });
        });

        console.log("save stuff");
    } else {
        console.log("invalid");
    }
}

const loadForm = async () => {

    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('name');

    const defaultValues = createDefaultValues();

    const localStorageValues = await getFromLocalStorage(name);

    const headerTitleElement = document.querySelector(`.dialogHeaderTitle`);

    if (localStorageValues.name) {

        headerTitleElement.innerText = "Edit Saved Replies";

        setValues(localStorageValues);
    } else {
        headerTitleElement.innerText = "Add Saved Replies";

        setValues(defaultValues);
    }

    setupValidation();

    document.getElementById(`close`)
        .addEventListener(`click`, close);

    document.getElementById(`cancel`)
        .addEventListener(`click`, async () => close());

    document.getElementById(`save`)
        .addEventListener(`click`, async () => await save());

}

await loadForm();
