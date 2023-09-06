document.addEventListener("soft-nav:end", main);

async function main () {

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
                console.log(`replaced!`)
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

    const isParticularGitHubIssueUrl = () => {
         
        let url = window.location.href;    
        
        let pattern = /^(https?:\/\/)github\.com\/[Pp]articular\/[\dA-z\.-]+\/issues\/\d+$/g;
        
        return pattern.test(url);
    }

    const appendSavedReplies = async () => {

        const replyCategoriesDetailsMenus = document.querySelectorAll(
            `markdown-toolbar details-menu[src^="/settings/replies?context="]`
        );

        const replies = await getSavedReplies();

        const repliesDivider = createParticularRepliesDivider();

        const repliesDiv = createParticularRepliesDiv(replies)

        for (const replyCategoriesDetailsMenu of replyCategoriesDetailsMenus) {

            replyCategoriesDetailsMenu.appendChild(repliesDivider);

            repliesDivider.insertAdjacentElement("afterend", repliesDiv);
        }
    }
   
    if(isParticularGitHubIssueUrl()){
        await appendSavedReplies();
    }
}

main().catch((error) => {
    console.error("Oh no!", error);
});