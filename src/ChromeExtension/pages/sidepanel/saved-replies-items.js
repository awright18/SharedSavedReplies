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
                    style:`font-size:16px;
                           text-align:center;
                           width:175px;
                           background-color:rgba(0, 0, 0, 0.7); 
                           color:white; 
                           border-radius:5px;
                           transform:translate(-50%,-50%);
                           z-index: 9999;
                           position:absolute;
                           top:80%;
                           left:50%;
                           `
                });  
                // Add the overlay to the body
                savedRepliesDiv.appendChild(overlay);
                // Remove the overlay after a short delay
                setTimeout(() => {
                 savedRepliesDiv.removeChild(overlay);
                }, 1500);
        
              
    } catch (err) {
            console.error('Failed to copy: ', err);
    }
}