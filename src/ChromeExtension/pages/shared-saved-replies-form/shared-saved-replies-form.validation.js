import { createDialogErrorElement } from "./dialogError-elements.js";

const doesNameExistInLocalStorage = async (name) => {

    const configKey = `${name}-config`;

    const result = await chrome.storage.local.get([configKey]);

    //check for an empty object
    for (var i in result) {
        return true;
    }

    return false;
}

const setNameElementValidationMessage = async () => {

    const nameElement = document.querySelector("#name");

    nameElement.setAttribute(`data-errorMessage`, `Please enter a name.`);

    const nameExistsInLocalStorage = await doesNameExistInLocalStorage(nameElement.value);

    if (nameExistsInLocalStorage) {
        nameElement.setAttribute(`data-errorMessage`, `The name ${nameElement.value} is already in use, please choose a different name.`);

        nameElement.setCustomValidity(`name taken`);
    }
}

const validateElement = async (elementToValidate) => {

    //reset the state 
    let isValid = true;

    let domChanged = false;

    await setNameElementValidationMessage();

    document.querySelectorAll(`.dialogInput`)
        .forEach(element => {

            if (elementToValidate) {
                if (element.id !== elementToValidate.id) {
                    return;
                }
            }

            if (!element.checkValidity()) {

                //set the customValidity so changes will be considered next time checkValidty is called.
                element.setCustomValidity(``);

                let dialogErrorElement = element.closest(`.error`);

                if (!dialogErrorElement) {

                    dialogErrorElement = createDialogErrorElement(element.cloneNode());

                    element.replaceWith(dialogErrorElement);

                    domChanged = true;
                }

                const errorLabelTextElement = dialogErrorElement.querySelector(`.errorLabel ~ span`);

                const errorMessage = element.getAttribute(`data-errorMessage`);

                errorLabelTextElement.innerText = ` ${errorMessage}`;

                isValid = false;

            } else {

                const dialogErrorElement = element.closest('.error');

                if (dialogErrorElement) {

                    dialogErrorElement.replaceWith(element.cloneNode());

                    domChanged = true;
                }
            }
        });

    if (domChanged) {
        addDialogInputEventhandlers();
    }

    return isValid;
}

const focusOnParentElement = (event) => {

    event.target.parentElement?.classList.add("focus");
}

const removeFocusFromParentElement = async (event) => {

    event.target.parentElement?.classList.remove("focus");

    await validateElement(event.target);
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



const addDialogInputEventhandlers = () => {
    document.querySelectorAll(`.dialogInput`)
        .forEach(element => {

            if (element.id === `allowEverywhere`) {
                element.addEventListener('click', (event) => {
                    tryEnableLimitToGitHubOwner(element);
                })
            }

            element.addEventListener('focus', (event) => focusOnParentElement(event));

            element.addEventListener('blur', async (event) => await removeFocusFromParentElement(event));
        });
}

const validateForm = () => {
    return validateElement();
}

const setupValidation = () => {

    addDialogInputEventhandlers();

    tryEnableLimitToGitHubOwner();

}

export { setupValidation, validateForm };