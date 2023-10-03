import { themes, getCurrentTheme, applyTheme, applyCurrentTheme } from "../../js/modules/theme.js";
import { getSettings, saveSettings } from "../../js/modules/settings.js";


const getFormValues = () => {

    return {
        theme: document.getElementById(`theme`).value,
        allowEverywhereDefault: document.getElementById(`allowEverywhere`).checked,
        limitToGitHubOwnerDefault: document.getElementById('limitToGitHubOwner').value,
        includeIssuesDefault: document.getElementById(`includeIssues`).checked,
        includePullRequestsDefault: document.getElementById(`includePullRequests`).checked,
        refreshRateInMinutesDefault: document.getElementById(`refreshRateInMinutes`).value,
    };
}

const close = async () => {
    await chrome.tabs.getCurrent((tab) => chrome.tabs.remove(tab.id));
}

const save = async () => {

    const formValues = getFormValues();

    await saveSettings(formValues);

    await close();
}

const tryEnableLimitToGitHubOwner = () => {

    const allowEverywhere = document.getElementById(`allowEverywhere`);
    const limitToGitHubOwner = document.getElementById(`limitToGitHubOwner`);

    if (!allowEverywhere.checked) {
        limitToGitHubOwner.setAttribute(`required`, ``);
        limitToGitHubOwner.removeAttribute(`disabled`, ``);
    } else {
        limitToGitHubOwner.removeAttribute(`required`);
        limitToGitHubOwner.setAttribute(`disabled`, ``);
    }
}

const capiatlizeWord = (word) =>{

    
    const firstLetter = word.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase()

    const remainingLetters = word.slice(1)

    const capitalizedWord = firstLetterCap + remainingLetters

    return capitalizedWord;
}

const loadForm = async () => {

    const settings = await getSettings();
   
    document.getElementById(`allowEverywhere`).checked = settings.allowEverywhere;
    document.getElementById('limitToGitHubOwner').value = settings.limitToGitHubOwner;
    document.getElementById(`includeIssues`).checked = settings.includeIssues;
    document.getElementById(`includePullRequests`).checked = settings.includePullRequests;
    document.getElementById(`refreshRateInMinutes`).value = Number(settings.refreshRateInMinutes);

    const themesElement = document.querySelector(`select`);

    for (let theme of themes) {

        var option = document.createElement('option');

        option.value = theme;

        option.innerHTML = capiatlizeWord(theme);

        themesElement.appendChild(option);
    }

    document.getElementById(`theme`).value = await getCurrentTheme();

    themesElement.addEventListener(`change`, async (event) => await applyTheme(event.target.value));

    document.getElementById(`allowEverywhere`)
        .addEventListener(`click`, () => tryEnableLimitToGitHubOwner());
    
    tryEnableLimitToGitHubOwner()

    document.getElementById(`close`)
        .addEventListener(`click`, async () => await close());

    document.getElementById(`cancel`)
        .addEventListener(`click`, async () => await close());

    document.getElementById(`save`)
        .addEventListener(`click`, async () => await save());

    await applyCurrentTheme();
}

const initialize = async () => {

    console.log("options init");

    await loadForm();

}

await initialize();