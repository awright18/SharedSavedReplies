import { setupValidation, validateForm } from "./shared-replies-form.validation.js";

const createDefaultValues = () => {
    return {
        url: ``,
        name: ``,
        allowEverywhere: true,
        limitToGitHubOwner: ``,
        includeIssues: true,
        includePullRequests:true,
        refreshRate:1,
        refreshRateInterval:`Hours`
    }
}

const getFromLocalStorage = async (name) => {

    if(!name){
        return createDefaultValues();
    }

   return await chrome.storage.local.get([name]);
}

const saveToLocalStorage = async(values) => {

    if(!values){
        throw new Error("Cannot save null shared reply.");
    }

    let key = values.name;

    await chrome.storage.local.set({key, values});
}

const getFormValues = () => {

    return {
        url: document.getElementById(`url`).value,
        name: document.getElementById(`name`).value,
        allowEverywhere:document.getElementById(`allowEverywhere`).checked,
        limitToGitHubOwner: document.getElementById('limitToGitHubOwner').value,
        includeIssues: document.getElementById(`includeIssues`).checked,
        includePullRequests: document.getElementById(`includePullRequests`).checked,
        refreshRate: document.getElementById(`refreshRate`).value,
        refreshRateInterval: document.getElementById('refreshRateInterval').value
    };
}

const setValues = (values) =>{
    document.getElementById(`url`).value = values.url;
    document.getElementById(`name`).value = values.name;
    document.getElementById(`allowEverywhere`).checked = values.allowEverywhere,
    document.getElementById('limitToGitHubOwner').value = values.limitToGitHubOwner;
    document.getElementById(`includeIssues`).checked = values.includeIssues;
    document.getElementById(`includePullRequests`).checked = values.includePullRequests;
    document.getElementById(`refreshRate`).value = values.refreshRate;
    document.getElementById('refreshRateInterval').value = values.refreshRateInterval;
}

const close = async () => {

    window.close();
}

const save = () => {
    
    if(validateForm()){

        const values = getFormValues();

        saveToLocalStorage(values);

        console.log("save stuff");
    }else{
        console.log("invalid");
    }
}

const loadForm = async () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    
    const name = urlParams.get('name');

    const defaultValues = createDefaultValues();

    const localStorageValues = await getFromLocalStorage(name);

    if(localStorageValues){

        setValues(localStorageValues);
    }else{

        setValues(defaultValues);
    }
        
    setupValidation();

    document.getElementById(`close`)
        .addEventListener(`click`,close);

    document.getElementById(`save`)
        .addEventListener(`click`,save);    
}

loadForm();
