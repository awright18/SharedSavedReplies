const createElement = (tagName, { children, className, ...attributes } = {}) => {

    const element = document.createElement(tagName);

    if (children) {

        element.append(...children);
    }

    if (className) {

        element.className = className;
    }

    for (const [key, value] of Object.entries(attributes)) {

        if (value) {

            element.setAttribute([key], value)
        }
    }

    return element;
}

export { createElement };