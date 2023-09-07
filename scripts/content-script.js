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
            console.log("couldn't find spot!");
        }

        for (const replyCategoriesDetailsMenu of replyCategoriesDetailsMenus) {

            replyCategoriesDetailsMenu.insertAdjacentElement("afterend", repliesDiv);
        }
    }

    // if (isParticularGitHubIssueUrl()) {
    //     await appendSavedReplies();
    // }

    const onOpenSavedRepliesButtonClick = async () => {

        if (isParticularGitHubIssueUrl()) {
            await appendSavedReplies();
        }

        openSavedRepliesButton.removeEventListener(
            "click",
            onOpenSavedRepliesButtonClick
        )
    }

    openSavedRepliesButton.addEventListener(
        "click",
        onOpenSavedRepliesButtonClick
    );
}

main().catch((error) => {
    console.error("Oh no!", error);
});