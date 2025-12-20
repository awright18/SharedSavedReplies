const createSavedRepliesUl = (savedReplies) => {

    const repliesUl = createElement("ul", {
        children: [],
        className:"js-saved-reply-menu ActionListWrap shared-saved-replies",
        "aria-label":"Shared saved replies",
        "id": `action-list-c91b88da-b2d0-424b-b824-7a08b4be375c`,
        role:"list",
        "data-view-component":"true"
    });

    for (const [i, reply] of savedReplies.entries()) {
        const button = createElement("button", {
            children: [
                createElement("span", {    
                    children:[
                        createElement("span",{
                            children:[reply.name],
                            className:"ActionListItem-label ActionListItem-label--truncate",
                            "data-view-component":"true"
                        }),
                        createElement("span",{
                            children:[
                                createElement("span",{
                                    children:[
                                        createElement("span",{
                                            children:[reply.body],
                                            className:"Truncate-text",
                                            "data-view-component":"true"
                                        })
                                    ],
                                    className:"Truncate js-saved-reply-body",
                                    "id":`saved-reply-item-description-${i}`,
                                    "aria-hidden":"true",
                                    "data-view-component":"true"
                                })
                            ],
                            className:"ActionListItem-descrtiption",
                        })
                    ],
                    className:"ActionListItem-descriptionWrap",
                    "data-view-component":"true"                    
                }),
                createElement("span",{
                    children:[
                        createElement("span",{
                            children:[`ctrl ${i+1}`],
                            className:'Label',
                            "data-view-component":"true"
                        }),          
                    ],
                    className: "ActionListItem-visual ActionListItem-visual--trailing"
                })
            ],
            className: "ActionListContent",
            role: "menuitem",
            type: "button",
            "id":`item-{i}`,
            "data-shortcut":`"${i}"`,
            "aria-describedby":`saved-reply-item-description-${i}`,
            "data-view-component":"true",
            tabIndex:"0"
        });

        // It looks like GitHub's built-in clicking logic already sets up this listener.
        button.addEventListener("click", (event) => {
            event.preventDefault();
        });

        var replyButtonLi = createElement("li", {
            children: [button],
            className:"ActionListItem",
            "data-targets":"action-list.items",
            "data-view-component":"true"
        });

        repliesUl.appendChild(replyButtonLi);
    }

    return repliesUl;
}