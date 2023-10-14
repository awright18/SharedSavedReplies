import { isGitHubPermissionEnabled, requestGitHubPermissions } from "../../js/modules/github-permissions.js";

const initialize = async () => {

    const gitHubPermissionEnabled = await isGitHubPermissionEnabled();

    console.log("GitHubPermissionsEnabled: ", gitHubPermissionEnabled);

    const enableGitHubButton = document.querySelector(`.enable-github-button`);

    enableGitHubButton.addEventListener(`click`, async () => {

        const response = await requestGitHubPermissions();

        if (response) {
            await chrome.tabs.getCurrent((tab) => chrome.tabs.remove(tab.id));
        }

    });

    if (gitHubPermissionEnabled) {
        await chrome.tabs.getCurrent((tab) => chrome.tabs.remove(tab.id));
    }
}

initialize();