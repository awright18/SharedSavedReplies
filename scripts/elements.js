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

const onRefreshRepliesButtonClick = async (event) => {

    event.preventDefault();

    const refreshImages = document.querySelectorAll(".particular-refresh-image");

    if (refreshImages) {

        for (let refreshImage of refreshImages) {
            const refreshImageSrc = chrome.runtime.getURL("images/refresh-particular-replies-2.png");
            refreshImage.src = refreshImageSrc;

        }
    }

    const existingRepliesDivs = document.querySelectorAll(".particular-replies");

    const savedReplies = await getSavedReplies(false);

    const updatedRepliesDiv = createParticularRepliesDiv(savedReplies);

    if (existingRepliesDivs) {

        for (let repliesDiv of existingRepliesDivs) {
            repliesDiv.replaceWith(updatedRepliesDiv);              
        }
    }

    if (refreshImages) {

        for (let refreshImage of refreshImages) {
            const refreshImageSrc = chrome.runtime.getURL("images/refresh-particular-replies.png");
            refreshImage.src = refreshImageSrc;
        }
    }
}

const createParticularRepliesDivider = () => {

    const refershImage = createElement("img", {
        children: [],
        className: "particular-refresh-image"
    });

    const refreshImageSrc = chrome.runtime.getURL("images/refresh-particular-replies.png");

    refershImage.src = refreshImageSrc;

    const refreshRepliesButton = createElement("button", {
        children: [refershImage],
        className: "refresh-particular-replies"
    });

    refreshRepliesButton.addEventListener(
        "click",
        onRefreshRepliesButtonClick
    );

    const repliesDivider = createElement("div", {
        children: ["Particular Replies", refreshRepliesButton],
        className: "select-menu-divider js-divider",
    })

    return repliesDivider;
}

const createParticularRepliesDiv = (savedReplies) => {

    const repliesDivider = createParticularRepliesDivider();

    const repliesUl = createElement("ul", {
        children: [],
        role: "none"
    });

    const repliesDiv = createElement("div", {
        children: [repliesDivider, repliesUl],
        className: "select-menu-list particular-replies"
    });

    for (const [i, reply] of savedReplies.entries()) {
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
                        createElement("div", {
                            children: [
                                createElement("code", {
                                    children: [
                                        createElement("span", {
                                            children: [
                                                `ctrl ${i+1}`
                                            ],
                                            className: "border rounded-2 p-1 no-wrap"
                                        })
                                    ]
                                })
                            ],
                            className: "col-3 text-right"
                        })
                    ],
                    className: "select-menu-item-text d-flex flex-items-center",
                })
            ],
            className: "select-menu-item width-full",
            "data-ga-click": "Saved Replies, click, saved reply number 3",
            role: "menuitem",
            type: "button",
        });

        // It looks like GitHub's built-in clicking logic already sets up this listener.
        button.addEventListener("click", (event) => {
            event.preventDefault();
        });

        var replyButtonLi = createElement("li", {
            children: [button],
            role: "none",
            "data-value": reply.name
        });

        repliesUl.appendChild(replyButtonLi);
    }

    return repliesDiv;
}