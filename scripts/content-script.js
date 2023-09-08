document.addEventListener("soft-nav:end", main);

const isParticularGitHubIssueUrl = () => {

    let url = window.location.href;

    let pattern = /^(https?:\/\/)github\.com\/particular\/[\dA-z\.-]+\/issues\/\d+/i;

    return pattern.test(url);
}

async function main() {

    if(!isParticularGitHubIssueUrl){
        return;
    }

    await updateSavedReplies();

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

    const createSavedRepliesDiv = async () => {

        const replies = await getSavedReplies();

        const repliesDiv = createParticularRepliesDiv(replies)

        return repliesDiv;
    }

    let repliesDiv = await createSavedRepliesDiv();

    const appendSavedReplies = async () => {

        const replyDetailsMenus =
         document.querySelectorAll(
            `markdown-toolbar details-menu[src^="/settings/replies?context="] fuzzy-list div.select-menu-filters`// .select-menu-list
        );

        if (replyDetailsMenus.length === 0) {
            console.log("Element to attach to not found!");
        }

        for (const replyDetailsMenus of replyCategoriesDetailsMenus) {

            //TODO:check to see if replies exist before adding them.

            replyDetailsMenus.insertAdjacentElement("afterend", repliesDiv);

            observer.disconnect();
        }
    }

    const savedReplyContainer =
        document.querySelector(`.js-saved-reply-menu.hx_rsm-modal`);

    const appendSavedRepliesOnOpen = async (mutationList, observer) => {          
        for (const mutation of mutationList) {            
            if (mutation.addedNodes.length > 0) {            
                mutation.addedNodes.forEach(async node => {
                    if(node.nodeName === "FUZZY-LIST"){
                        await appendSavedReplies();
                    }
                })
            }
        }
    }

    const startObservingDetailsMenu = (targetElement, onMutation) => {

        const observer = new MutationObserver(onMutation);

        const config = { attributes: true, childList: true, subtree: true };

        observer.observe(targetElement, config);

        return observer;
    }

    const observer =
        startObservingDetailsMenu(savedReplyContainer, appendSavedRepliesOnOpen);
}

main().catch((error) => {
    console.error("Oh no!", error);
});