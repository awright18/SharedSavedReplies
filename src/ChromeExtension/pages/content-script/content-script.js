const main = async () => {

    console.log("main called");
    
    const url = window.location.href;
 
    if (!shouldLoadContentScript(url)) {
        return;
    }

    const showSavedRepliesButton = createShowSavedRepliesButton();
    
    await addShowSavedRepliesClickHandler(showSavedRepliesButton);

    document.body.appendChild(showSavedRepliesButton);

}

document.addEventListener("soft-nav:end", main);

main().catch((error) => {
	console.error("Oh no!", error);
});