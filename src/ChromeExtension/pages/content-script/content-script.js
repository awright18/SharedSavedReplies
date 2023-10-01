const main = async () => {

    console.log("main called");

    if (!isValidIssueUrl()) {
        return;
    }

    let observer;
    let repliesDiv;
    let replies;
    let initialUpdatedAt = await getSavedRepliesLastUpdatedAtFromLocalStorage();

    const haveSavedRepliesBeenUpdated = async () => {

        const currentUpdatedAt = await getSavedRepliesLastUpdatedAtFromLocalStorage();

        return dateIsBefore(initialUpdatedAt, currentUpdatedAt);
    }

    const prepareRepliesDiv = async () => {

        replies = await getMatchingSavedReplyConfigsFromLocalStorage();

        if(replies){
            repliesDiv = await createSavedRepliesDiv(replies);
        }else{
            repliesDiv = document.createElement(`div`);
        }
    }

    const addSavedRepliesToFuzzyList = async (node) => {

        let savedRepliesDiv = document.querySelector(`.saved-replies`);

        if (savedRepliesDiv) {

            // const savedRepliesWereUpdated =
            //     await haveSavedRepliesBeenUpdated();

            // if (savedRepliesWereUpdated) {

                await prepareRepliesDiv();

                savedRepliesDiv.replaceWith(repliesDiv);
            // }

            return;
        }
        else {

            if (node.nodeName === "FUZZY-LIST") {

                let fuzzyList = node;

                await prepareRepliesDiv();

                const savedReplyMenuFilterSelector =
                    `div.select-menu-filters`;

                const savedReplyFilter =
                    fuzzyList.querySelector(savedReplyMenuFilterSelector);

                savedReplyFilter.insertAdjacentElement("afterend", repliesDiv);
            }
        }
    }

    observer = new MutationObserver(
        async (mutationList, obs) => {

            for (const mutation of mutationList) {

                if (mutation.type === "attributes" && mutation.attributeName == "open") {

                    let replyContainer =  document.querySelector(`#saved-reply-new_comment_field`).closest(`.js-saved-reply-container`);

                    if (replyContainer.attributes.open) {
                        console.log(`open`);

                        let node = replyContainer.querySelector('FUZZY-LIST');

                        await addSavedRepliesToFuzzyList(node);

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