const main = async () => {

    console.log("main called");

    if (!shouldLoadContentScript()) {
        return;
    }

    let observer;
    let repliesDiv;
    let replies;

    const prepareRepliesDiv = async () => {

        replies = await getMatchingSavedReplyConfigsFromLocalStorage();

        const repliesExist = arrayIsNotEmpty(replies);

        if (repliesExist) {

            repliesDiv = await createSavedRepliesDiv(replies);           
        }
    }

    const tryUpdateSavedRepliesDiv = () => {

        let savedRepliesDiv = document.querySelector(`.saved-replies`);
        
        const repliesExist = arrayIsNotEmpty(replies);

        if (repliesExist && savedRepliesDiv) {

            savedRepliesDiv.replaceWith(repliesDiv);

            return true; 

        } else if (savedRepliesDiv) {

            savedRepliesDiv.remove();

            return true;
        }
    }

    const tryUpdateFuzzyList = (node) => {

        let isFuzzyList = node.nodeName === "FUZZY-LIST";

        let savedReplyFilter;

        let savedRepliesDiv;

        const repliesExist = arrayIsNotEmpty(replies);

        if (isFuzzyList) {
            let fuzzyList = node;

            const savedReplyMenuFilterSelector =
                `div.select-menu-filters`;

            savedReplyFilter =
                fuzzyList.querySelector(savedReplyMenuFilterSelector);

            savedRepliesDiv = savedReplyFilter.querySelector(`.saved-replies`);;
        }

        if (repliesExist && savedReplyFilter) {

            savedReplyFilter.insertAdjacentElement("afterend", repliesDiv);

            return true; 

        } else if (savedRepliesDiv) {
        
            savedRepliesDiv.remove();

            return true; 
        }

        return false; 
    }

    const onSavedRepliesOpened = async (node) => {

        await prepareRepliesDiv();

        if(tryUpdateSavedRepliesDiv()){
            return; 
        }

        if(tryUpdateFuzzyList(node)){
            return;
        }
    }


    observer = new MutationObserver(
        async (mutationList, obs) => {

            for (const mutation of mutationList) {

                if (mutation.type === "attributes" && mutation.attributeName == "open") {

                    let replyContainer = document.querySelector(`#saved-reply-new_comment_field`).closest(`.js-saved-reply-container`);

                    if (replyContainer.attributes.open) {
                        console.log(`open`);

                        let node = replyContainer.querySelector('FUZZY-LIST');

                        await onSavedRepliesOpened(node);

                    }
                }
            }
        });

    let savedReplyContainer = document.querySelector(`#saved-reply-new_comment_field`).closest(`.js-saved-reply-container`);

    observer.observe(savedReplyContainer, {
        attributes: true,
        childList: false,
        subtree: false
    });
}

main().catch((error) => {
    console.error("Oh no!", error);
});