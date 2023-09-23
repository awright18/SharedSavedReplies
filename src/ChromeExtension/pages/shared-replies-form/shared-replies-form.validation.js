import { createDialogErrorElement} from "./dialogError-elements.js";

const focusOnParentElement = (event) =>{  
    
    event.target.parentElement?.classList.add("focus");
}

const removeFocusFromParentElement = (event) =>{   
            
    event.target.parentElement?.classList.remove("focus");                    
    
    validateElement(event.target);
}

const tryEnableLimitToGitHubOwner = () => {
    
    const allowEverywhere = document.getElementById(`allowEverywhere`);
    const limitToGitHubOwner = document.getElementById(`limitToGitHubOwner`);
                
    if(!allowEverywhere.checked){              
        limitToGitHubOwner.setAttribute(`required`,``);
        limitToGitHubOwner.removeAttribute(`disabled`,``);
    }else{
        limitToGitHubOwner.removeAttribute(`required`);
        limitToGitHubOwner.setAttribute(`disabled`,``);
    }    
}

const addDialogInputEventhandlers = () => {
    document.querySelectorAll(`.dialogInput`)
    .forEach(element => {

        if(element.id === `allowEverywhere`){
            element.addEventListener('click', (event) => {                
                tryEnableLimitToGitHubOwner(element);    
            })
        }

        element.addEventListener('focus',(event) => focusOnParentElement(event));

        element.addEventListener('blur',(event) => removeFocusFromParentElement(event));
});
}

const validateForm = () => {
    return validateElement();
}

const validateElement = (elementToValidate) =>{
    
    let isValid = true;
    let domChanged = false;

    document.querySelectorAll(`.dialogInput`)
        .forEach(element => {
            
            if(elementToValidate){
                if(element.id !== elementToValidate.id){
                    return;
                }
            }

            if(!element.checkValidity()){                            

                const dialogErrorElement = element.closest(`.error`);

                if(!dialogErrorElement){
                
                    const dialogErrorElement = createDialogErrorElement(element.cloneNode());

                    element.replaceWith(dialogErrorElement);

                    domChanged = true;
                }

                isValid = false;
            }else{
                
                const dialogErrorElement = element.closest('.error');

                if(dialogErrorElement){
                
                    dialogErrorElement.replaceWith(element.cloneNode());

                    domChanged = true;
                }
            }           
    });

    if(domChanged){
        addDialogInputEventhandlers();
    }

    return isValid;
}

const setupValidation = () => {

    addDialogInputEventhandlers();

    tryEnableLimitToGitHubOwner();

}

export {setupValidation, validateForm};