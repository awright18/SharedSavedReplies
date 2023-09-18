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

        replies = await getSavedRepliesFromLocalStorage();

        repliesDiv = await createSavedRepliesDiv(replies);
    }

    const addSavedRepliesToFuzzyList = async (node) => {

        let savedRepliesDiv = document.querySelector(`.saved-replies`);

        if (savedRepliesDiv) {
            
            const savedRepliesWereUpdated =
                await haveSavedRepliesBeenUpdated();

            if (savedRepliesWereUpdated) {

                await prepareRepliesDiv();

                savedRepliesDiv.replaceWith(repliesDiv);
            }

            return;
        }
        else {

            if (node.nodeName === "FUZZY-LIST") {

                let fuzzyList = node;

                await prepareRepliesDiv();

                const savedReplyMenuFilterSelector =
                    `details-menu.js-saved-reply-menu.hx_rsm-modal fuzzy-list div.select-menu-filters`;

                const savedReplyFilter =
                    fuzzyList.querySelector(savedReplyMenuFilterSelector);

                savedReplyFilter.insertAdjacentElement("afterend", repliesDiv);
            }
        }
    }

    observer = new MutationObserver(
        async (mutationList, obs) => {

            let replyContainer = document.querySelector(`.js-saved-reply-container.hx_rsm`);

            if (replyContainer.attributes.open) {
                console.log(`open`);

                let node = replyContainer.querySelector('FUZZY-LIST');

                await addSavedRepliesToFuzzyList(node);

            }

            // observer.disconnect();         
        });

    // observer = new MutationObserver(
    //     async (mutationList,obs) => {

    //         for (const mutation of mutationList)
    //         {
    //             if(mutation.addedNodes){

    //                 //It's not possible to await iterations of a foreach loop
    //                 // otherwise foreach or filter would have worked nicer here.
    //                 //This still maybe able to be cleaned up
    //                 for(let i = 0; i < mutation.addedNodes.length; ++i){

    //                     let node = mutation.addedNodes[i];

    //                     //Find the fuzzy-list, that will have the default replies
    //                     if(node.nodeName === "FUZZY-LIST"){

    //                         await addSavedRepliesToFuzzyList(node);

    //                         observer.disconnect();

    //                         return;
    //                     }
    //                 }
    //             }
    //         }
    //     });

    //Watch (observe) the savedReplyContainer until it contains a <fuzzy-list> element 
    //only then will it be possible to add the saved replies.

    // const savedReplyContainer =
    //     document.querySelector(`details-menu.js-saved-reply-menu.hx_rsm-modal`);

    // observer.observe(savedReplyContainer, {
    //     attributes : true,
    //     childList : true,
    //     subtree : true
    // });


    let savedReplyContainer = document.querySelector(`.js-saved-reply-container.hx_rsm`);

    observer.observe(savedReplyContainer, {
        attributes: true,
        childList: true,
        subtree: true
    });
}

main().catch((error) => {
    console.error("Oh no!", error);
});