const main = async () => {

    console.log("main called");
    
    const url = window.location.href;
 
    if (!shouldLoadContentScript(url)) {
        return;
    }

    // let observer;
    // let betaObserver;
    // let repliesUl;
    // let repliesForNestedIssuesDivs;
    // let replies;

    // const prepareRepliesUl = async (url) => {

    //     replies = await getMatchingSavedReplyConfigsFromLocalStorage(url);

    //     const repliesExist = arrayIsNotEmpty(replies);

    //     if (repliesExist) {

    //         repliesUl = await createSavedRepliesUl(replies);
    //     }
    // }

    // const tryUpdateSavedRepliesUl = () => {

    //     let savedRepliesUl = document.querySelector(`.shared-saved-replies`);

    //     const repliesExist = arrayIsNotEmpty(replies);

    //     if (repliesExist && savedRepliesUl) {

    //         savedRepliesUl.replaceWith(repliesUl);

    //         return true;

    //     } else if (savedRepliesUl) {

    //         savedRepliesUl.remove();

    //         return true;
    //     }
    // }

    // const tryUpdateFuzzyList = (node) => {

    //     let isFuzzyList = node.nodeName === "FUZZY-LIST";

    //     let savedReplyFilter;

    //     let savedRepliesUl;

    //     const repliesExist = arrayIsNotEmpty(replies);

    //     if (isFuzzyList) {
    //         let fuzzyList = node;

    //         const savedReplyMenuFilterSelector =
    //             `div[data-view-component="true"]`;

    //         savedReplyFilter =
    //             fuzzyList.querySelector(savedReplyMenuFilterSelector);

    //         savedRepliesUl = savedReplyFilter.querySelector(`.shared-saved-replies`);
    //     }

    //     if (repliesExist && savedReplyFilter) {

    //         savedReplyFilter.insertBefore(repliesUl, savedReplyFilter.firstChild);

    //         return true;

    //     } else if (savedRepliesUl) {

    //         savedRepliesUl.remove();

    //         return true;
    //     }

    //     return false;
    // }

    // const onSavedRepliesOpened = async (node) => {

    //     const url = window.location.href;

    //     await prepareRepliesUl(url);

    //     if (tryUpdateSavedRepliesUl()) {
    //         return;
    //     }

    //     if (tryUpdateFuzzyList(node)) {
    //         return;
    //     }
    // }

    // observer = new MutationObserver(
    //     async (mutationList, obs) => {

    //         console.log(`mutation happened`);

    //         for (const mutation of mutationList) {

    //             if (mutation.type === "attributes" && mutation.attributeName == "open") {

    //                 let replyContainer = document.querySelector(`#saved_replies_menu_new_comment_field-dialog`).closest(`.js-saved-reply-container`);

    //                 if (replyContainer.attributes.open) {
    //                     console.log(`open`);

    //                     let node = replyContainer.querySelector('FUZZY-LIST');

    //                     await onSavedRepliesOpened(node);

    //                 }
    //             }
    //         }
    //     });
    
    
    // let savedReplyContainer = document.querySelector(`#saved_replies_menu_new_comment_field-dialog`);

    // if(savedReplyContainer){

    //     observer.observe(savedReplyContainer, {
    //         attributes: true,
    //         childList: false,
    //         subtree: false
    //     });
    // }

    // const prepareSavedRepliesForNestedIssues = async (url) => {
        
    //     replies = await getMatchingSavedReplyConfigsFromLocalStorage(url);

    //     const repliesExist = arrayIsNotEmpty(replies);

    //     if (repliesExist) {
    //         repliesForNestedIssuesDivs = createSavedRepliesUIForNestedIssues(replies);
    //     }
    // }

    // const tryUpdateSavedRepliesForNestedIssues = () => {

    //     let saveRepliesContainer = getsSavedRepliesForNestedIssuesContainer();

    //     const repliesExist = arrayIsNotEmpty(repliesForNestedIssuesDivs);

    //     if (repliesExist && saveRepliesContainer) {

    //         addNewSavedRepliesToNestedIssuesContainer(
    //             repliesForNestedIssuesDivs,
    //             saveRepliesContainer);

    //         return true;

    //     } else if (saveRepliesContainer) {

    //         return true;
    //     }
    // }

    // const onSavedRepliesDialogIsVisible = async () => {
        
    //     const tab = await chrome.tabs.get(activeInfo.tabId);

    //     await prepareSavedRepliesForNestedIssues(tab.url);

    //     if(tryUpdateSavedRepliesForNestedIssues()){
            
    //         return;
    //     }
    // }


    // let addSavedReplyButton = document.querySelector(`button[aria-label="Add saved reply (Ctrl + .)"]`);

    // betaObserver = new MutationObserver(
    //     async (mutationList, obs) => {

    //         console.log(`beta mutation happened`);

    //         for (const mutation of mutationList) {
                
    //             if (mutation.type === "attributes" && mutation.attributeName == "aria-expanded"){

    //                 let savedRepliesDialogIsVisible = addSavedReplyButton.getAttribute("aria-expanded")  === "true";

    //                 if(savedRepliesDialogIsVisible)
    //                 {
    //                    console.log("beta open")
                       
    //                   await onSavedRepliesDialogIsVisible();

    //                 }else{
    //                     console.log("beta closed")
    //                 }
    //             }
    //         }
    //     }
    // );

    // if(addSavedReplyButton){

    //     betaObserver.observe(addSavedReplyButton, {
    //         attributes: true,
    //         childList: false,
    //         subtree: false
    //     });

    //     console.log("observer connected.");
    // }
  
    const showSavedRepliesButton = createShowSavedRepliesButton();
    
    await addShowSavedRepliesClickHandler(showSavedRepliesButton);

    document.body.appendChild(showSavedRepliesButton);

    const hideSavedRepliesButton = createHideSavedRepliesButton();
    
    await addHideSavedRepliesClickHandler(hideSavedRepliesButton);

    document.body.appendChild(hideSavedRepliesButton);
}

document.addEventListener("soft-nav:end", main);

main().catch((error) => {
	console.error("Oh no!", error);
});