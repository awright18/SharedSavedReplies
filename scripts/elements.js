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
            element.setAttribute(key, value)
        }
    }

    return element;
}

const createParticularRepliesDiv = (savedReplies) => {

    const repliesDiv = createElement("div", {
        children: [],
        className: "particular-replies"
    });

    for (const reply of savedReplies) {
        const button = createElement("button", {
            children: [
                createElement("div", {
                    children: [
                        createElement("div", {
                            children: [
                                createElement("span", {
                                    children: [reply.name],
                                    className:
                                        "select-menu-item-heading css-truncate css-truncate-target",
                                }),
                                createElement("span", {
                                    children: [reply.body],
                                    className:
                                        "description css-truncate css-truncate-target js-saved-reply-body",
                                }),
                            ],
                            className: "flex-auto col-9",
                        }),
                    ],
                    className: "select-menu-item-text d-flex flex-items-center",
                }),
            ],
            className: "select-menu-item width-full",
            role: "menuitem",
            type: "button",
        });

        // It looks like GitHub's built-in clicking logic already sets up this listener.
        button.addEventListener("click", (event) => {
            event.preventDefault();
        });

        var replyContainer = createElement("ul", {
            children: [
                createElement("li", { children: [button], role: "none" }),
            ],
            role: "none",
        });

        repliesDiv.appendChild(replyContainer);
    }

    return repliesDiv;
}