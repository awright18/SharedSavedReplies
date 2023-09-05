
document.addEventListener("soft-nav:end", main);

const repliesStorageKey = "particular-saved-replies";

const getRepliesFromLocalStorage = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([repliesStorageKey], function (result) {
            if (result[repliesStorageKey] === undefined) {
                resolve(null);
            } else {
                resolve(result[repliesStorageKey]);
            }
        });
    });
}

const addRepliesToLocalStorage = async (replies) => {
    return new Promise((resolve) => {
        chrome.storage.local.set({ repliesStorageKey: replies });
        resolve();
    })
}

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

getSavedReplies = async (useCached = true) => {

    const cachedReplies = await getRepliesFromLocalStorage();

    if (cachedReplies && useCached === true) {
        return cachedReplies;
    }

    const savedReplyTemplatesUrl = "https://github.com/Particular/StaffSuccess/blob/master/github/saved-reply-templates.md";

    const response = await fetch(savedReplyTemplatesUrl);

    const json = await response.json();

    const html = json.payload.blob.richText;

    var parser = new DOMParser();

    var doc = parser.parseFromString(html, "text/html");

    var replayNameH2s = Array.from(doc.querySelectorAll("h2[tabindex='-1']"))
    replayNameH2s.shift();
    var replayNames = replayNameH2s.map(e => e.innerText);

    var replyPreElements = Array.from(doc.querySelectorAll("h2[tabindex='-1'] ~ .highlight > pre"));

    var replyBodies = replyPreElements.map(e => e.innerText);

    var replies = [];

    for (let i = 0; i < replyBodies.length; i++) {
        replies.push({ name: replayNames[i], body: replyBodies[i] })
    }

    await addRepliesToLocalStorage(replies);

    return replies;
}

async function main() {

    const openSavedRepliesButton = document.getElementById(
        "saved-reply-new_comment_field"
    );


    if (!openSavedRepliesButton) {
        return;
    }

    const newCommentField = document.getElementById("new_comment_field")

    if (!newCommentField) {
        console.error("Couldn't find comment field");
        return;
    }

    const createParticularRepliesDivider = () => {

        const refershImage = createElement("img",{
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
            children: ["Particular replies", refreshRepliesButton],
            className: "select-menu-divider js-divider",
        })

        return repliesDivider;
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

    const notifyOfParticularRepliesUpdated = ()=>{
        chrome.runtime.sendMessage('', {
            type: 'notification',
            options: {
                title: 'Particular replies updated',
                message: 'The Particular Saved Replies were updated',
                iconUrl: chrome.runtime.getURL('icons/original/icon16.png'),
                type: 'basic'
          }
        });    
    }

    const onRefreshRepliesButtonClick = async (event) => {

        event.preventDefault();
            
        const refreshImages = document.querySelectorAll(".particular-refresh-image");

        if(refreshImages){

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
                console.log(`replaced!`)
            }
        }    
        
        if(refreshImages){

            for (let refreshImage of refreshImages) {                
                const refreshImageSrc = chrome.runtime.getURL("images/refresh-particular-replies.png");
                refreshImage.src = refreshImageSrc;

            }
        }

        notifyOfParticularRepliesUpdated();
    }

    const onOpenSavedRepliesButtonClick = async () => {

        const replyCategoriesDetailsMenus = document.querySelectorAll(
            `markdown-toolbar details-menu[src^="/settings/replies?context="]`
        );        

        const replies = await getSavedReplies();

        const repliesDivider = createParticularRepliesDivider();

        const repliesDiv = createParticularRepliesDiv(replies)

        for (const replyCategoriesDetailsMenu of replyCategoriesDetailsMenus) {            

            replyCategoriesDetailsMenu.appendChild(repliesDivider);

            repliesDivider.insertAdjacentElement("afterend",repliesDiv);

        }

        openSavedRepliesButton.removeEventListener(
            "click",
            onOpenSavedRepliesButtonClick
        );
    }

    openSavedRepliesButton.addEventListener(
        "click",
        onOpenSavedRepliesButtonClick
    );
}

main().catch((error) => {
    console.error("Oh no!", error);
});