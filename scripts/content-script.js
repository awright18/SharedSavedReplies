document.addEventListener("soft-nav:end", main);

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

    const isParticularGitHubIssueUrl = () => {

        let url = window.location.href;

        let pattern = /^(https?:\/\/)github\.com\/[Pp]articular\/[\dA-z\.-]+\/issues\/\d+$/g;

        return pattern.test(url);
    }

    const createSavedRepliesDiv = async () => {

        const replies = await getSavedReplies();

        const repliesDiv = createParticularRepliesDiv(replies)

        return repliesDiv;
    }

    let repliesDiv = await createSavedRepliesDiv();

    const appendSavedReplies = async () => {

        const replyCategoriesDetailsMenus = document.querySelectorAll(
            `markdown-toolbar details-menu[src^="/settings/replies?context="] fuzzy-list div.select-menu-filters`// .select-menu-list
        );

        if (replyCategoriesDetailsMenus.length === 0) {
            console.log("Element to attach to not found!");
        }

        for (const replyCategoriesDetailsMenu of replyCategoriesDetailsMenus) {

            //TODO:check to see if replies exist before adding them.
            
            replyCategoriesDetailsMenu.insertAdjacentElement("afterend", repliesDiv);
            
            observer.disconnect();
        }
    }

    const savedReplyContainer =
        document.querySelectorAll(`details.details-overlay.js-saved-reply-container`)[1];

    const appendSavedRepliesOnOpen = async (list, observer) => {

        if (savedReplyContainer.hasAttribute("open")) {

            //TODO:check the filter criteria against the replies

            if (isParticularGitHubIssueUrl()) {
                await appendSavedReplies();            
            }
        }
    }

    const startObservingDetailsMenu = (targetElement,onMutation) => {

        const observer = new MutationObserver(onMutation);

        const config = { attributes: true, childList: true, subtree: true };

        observer.observe(targetElement, config);

        return observer;
    }

    const observer = 
        startObservingDetailsMenu(savedReplyContainer,appendSavedRepliesOnOpen);
}

main().catch((error) => {
    console.error("Oh no!", error);
});