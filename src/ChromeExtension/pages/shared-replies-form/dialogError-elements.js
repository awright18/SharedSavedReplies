import { createElement } from "../../js/modules/create-element.js";

const createDialogErrorElement = (element) => {

    const errorMessage = document.createElement(`span`);

    errorMessage.innerText = element.getAttribute(`data-errorMessage`);

    const errorElement =
        createElement(`div`, {
            children: [
                createElement(`div`, {
                    children: [
                        createElement(`div`, {
                            children: [
                                createElement(`div`, {
                                    children: [
                                        createElement(`span`, {
                                            children: [`ERROR:`],
                                            className: `errorLabel`
                                        }),
                                        errorMessage
                                    ],
                                    className: `validation-mg warning`
                                })
                            ],
                            className: `dialogError`
                        })
                    ],
                    className: `dialogErrorContainer`
                }),
                element
            ],
            className: `relative error`
        });

    return errorElement;
}

export { createDialogErrorElement }