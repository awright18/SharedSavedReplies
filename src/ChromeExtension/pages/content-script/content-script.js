const main = async () => {

    console.log("main called");

    if (!shouldLoadContentScript()) {
        return;
    }

    let observer;
    let repliesUl;
    let replies;

    const prepareRepliesUl = async () => {

        replies = await getMatchingSavedReplyConfigsFromLocalStorage();

        const repliesExist = arrayIsNotEmpty(replies);

        if (repliesExist) {

            repliesUl = await createSavedRepliesUl(replies);
        }
    }

    const tryUpdateSavedRepliesUl = () => {

        let savedRepliesUl = document.querySelector(`.shared-saved-replies`);

        const repliesExist = arrayIsNotEmpty(replies);

        if (repliesExist && savedRepliesUl) {

            savedRepliesUl.replaceWith(repliesUl);

            return true;

        } else if (savedRepliesUl) {

            savedRepliesUl.remove();

            return true;
        }
    }

    const tryUpdateFuzzyList = (node) => {

        let isFuzzyList = node.nodeName === "FUZZY-LIST";

        let savedReplyFilter;

        let savedRepliesUl;

        const repliesExist = arrayIsNotEmpty(replies);

        if (isFuzzyList) {
            let fuzzyList = node;

            const savedReplyMenuFilterSelector =
                `div[data-view-component="true"]`;

            savedReplyFilter =
                fuzzyList.querySelector(savedReplyMenuFilterSelector);

            savedRepliesUl = savedReplyFilter.querySelector(`.shared-saved-replies`);
        }

        if (repliesExist && savedReplyFilter) {

            savedReplyFilter.insertBefore(repliesUl, savedReplyFilter.firstChild);

            return true;

        } else if (savedRepliesUl) {

            savedRepliesUl.remove();

            return true;
        }

        return false;
    }

    const onSavedRepliesOpened = async (node) => {

        await prepareRepliesUl();

        if (tryUpdateSavedRepliesUl()) {
            return;
        }

        if (tryUpdateFuzzyList(node)) {
            return;
        }
    }

    observer = new MutationObserver(
        async (mutationList, obs) => {

            console.log(`mutation happened`);

            for (const mutation of mutationList) {

                if (mutation.type === "attributes" && mutation.attributeName == "open") {

                    let replyContainer = document.querySelector(`#saved_replies_menu_new_comment_field-dialog`).closest(`.js-saved-reply-container`);

                    if (replyContainer.attributes.open) {
                        console.log(`open`);

                        let node = replyContainer.querySelector('FUZZY-LIST');

                        await onSavedRepliesOpened(node);

                    }
                }
            }
        });

    let savedReplyContainer = document.querySelector(`#saved_replies_menu_new_comment_field-dialog`);

    observer.observe(savedReplyContainer, {
        attributes: true,
        childList: false,
        subtree: false
    });

}

document.addEventListener("soft-nav:end", main);

main().catch((error) => {
	console.error("Oh no!", error);
});