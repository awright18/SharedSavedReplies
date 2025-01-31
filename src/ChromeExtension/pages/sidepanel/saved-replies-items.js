const toggleTemplateVisibility = (element) => {
    const savedRepliesDiv = 
        element.closest("[data-saved-replies-name]");

    const templateContainerElement = 
        savedRepliesDiv
        .querySelector(".saved-replies-template-container");

    templateContainerElement.classList.toggle("visible");
}

const copySavedReplyTemplate = async (element) => {

    const savedRepliesDiv = 
        element.closest("[data-saved-replies-name]");

    const templateContainerElement = 
        savedRepliesDiv
        .querySelector(".saved-replies-template-container");
    
    const templateBodyCodeElement = 
        templateContainerElement
        .querySelector(".saved-replies-template-body > pre > code");
    
    const template = templateBodyCodeElement.getHTML();

    const updatedTemplate = template
        .replaceAll(`<span class="token code keyword">`,"")
        .replaceAll(`<span class="token comment">`,"")
        .replaceAll(`</span>`,"")
        .replaceAll(`&lt;!--`,`<!--`)
        .replaceAll(`--&gt;`,`-->`);
    
    try {
            await navigator.clipboard.writeText(updatedTemplate);
    } catch (err) {
            console.error('Failed to copy: ', err);
    }
}