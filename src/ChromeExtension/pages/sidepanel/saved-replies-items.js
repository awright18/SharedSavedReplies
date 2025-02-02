const toggleTemplateVisibility = (event) => {
    const savedRepliesDiv = 
        event.target.closest("[data-saved-replies-name]");

    const templateContainerElement = 
        savedRepliesDiv
        .querySelector(".saved-replies-template-container");

    templateContainerElement.classList.toggle("visible");
}

const copySavedReplyTemplate = async (event) => {

    const savedRepliesDiv = 
         event.target.closest("[data-saved-replies-name]");

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

                       // Create the overlay element
                const overlay = createElement('div',{
                    children:["Template copied!"],
                    className:"text-copied-indicator"
                });  


                // Add the overlay to the body
                savedRepliesDiv.insertBefore(overlay,templateContainerElement);
                // Remove the overlay after a short delay
                setTimeout(() => {
                 savedRepliesDiv.removeChild(overlay);
                }, 1500);
        
              
    } catch (err) {
            console.error('Failed to copy: ', err);
    }
}

const filterVisibleSavedReplies = (text) => {
    
    const savedReplyElements =
      document.querySelectorAll(`div[data-saved-replies-name]`);
    
    for(savedReplyElement of savedReplyElements){
       
        const elementWithTitle = 
                savedReplyElement.querySelector(`.saved-replies-button-header-text`);

        if(text === undefined || text === null || text === "" ){
            savedReplyElement?.classList?.remove("hide");
            continue;
        }
        
        if(!elementWithTitle?.innerText?.toLowerCase()?.includes(text?.toLowerCase())){
            savedReplyElement?.classList?.add("hide");
        }
    }
}

const onfilterVisibleSavedReplies = (event) => 
    filterVisibleSavedReplies(event.target.value);

const clearSearch = (event) =>{
   const searchBoxDiv = event.target.closest("div");
   
   const searchInputElement = searchBoxDiv.querySelector(".search");

   searchInputElement.value = "";

   filterVisibleSavedReplies("");

}