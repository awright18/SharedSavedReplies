const main = async () => {

    console.log("main called");

    const url = window.location.href;

    if (!shouldLoadContentScript(url)) {
        return;
    }
}

document.addEventListener("soft-nav:end", main);

main().catch((error) => {
    console.error("Oh no!", error);
});