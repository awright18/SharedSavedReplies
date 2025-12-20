const getsSavedRepliesForNestedIssuesContainer = () =>
     document.querySelector(`#__primerPortalRoot__  div[role="listbox"] > div`);

const getLastExistingSavedReplyElement = (savedRepliesContainer) => {
    
    let savedReplyElements = 
        savedRepliesContainer.querySelectorAll(`div[tabindex="-1"][role="option"]`);

     let lastSavedReplyElement = savedReplyElements[savedReplyElements.length- 1]

     return lastSavedReplyElement;
}
   
const calculateSavedReplyId = (lastId, savedReplyIndex) => {
   
   let numberIndex = lastId.search(`[0-9]`);
   
   if(numberIndex !== -1){
      
      let lastIdNumber = Number(lastId.substring(numberIndex)); 
      
      let newNumericalId = lastIdNumber + savedReplyIndex + 1;

      let idPrefix = lastId.substring(0, numberIndex);
      
      let newId = idPrefix + new String(newNumericalId);
      
      return newId;
   }
   else{
        
        return lastId;
   }
}



const setElementSavedReplyName = (element, name) =>{

    element.setAttribute(`saved-reply-name`, name);
}


const setSavedReplyId = (element,calculatedId) => {
 
    element.id = calculatedId;
}

const setSavedReplyName = (nameSpan, name) => {
     
    nameSpan.innerText = name;
}


const encodeSavedReplyBody = (body) => {
   
   let updatedBody = 
        body.replace(/\r\n/gi, '\\uFFFD')
            .replace(/\n/gi,'\\uFFFD');

   return updatedBody;
}

const setSavedReplyBody = (bodySpan, body) => {

    let encodedBody = encodeSavedReplyBody(body);

    bodySpan.innerText = encodedBody;
}

const createNewSavedReplyElementFromExistingElment = (templateElement, savedReply, index) => {

    let spans = templateElement.querySelectorAll(`span`);
    console.log("bodyspan", spans[1]);
    console.log("bodyspanInnerText", spans[1].innerText);
    console.log("savereplybody", savedReply.body);

    let newSavedReplyElement = templateElement.cloneNode(true);
    
    let savedReplySpans = newSavedReplyElement.querySelectorAll(`span`);

    let nameSpan = savedReplySpans[0];

    let bodySpan = savedReplySpans[1];

    setElementSavedReplyName(newSavedReplyElement, savedReply.name);

    setSavedReplyName(nameSpan, savedReply.name);

    setSavedReplyBody(bodySpan, savedReply.body);

    let id = calculateSavedReplyId(templateElement.id, index);

    setSavedReplyId(newSavedReplyElement, id);

    return newSavedReplyElement;
}

const createSavedRepliesUIForNestedIssues = (savedReplies) => {

    let savedRepliesDivs = [];

    let savedRepliesContainer = getsSavedRepliesForNestedIssuesContainer();

    let lastSavedReplyElement = getLastExistingSavedReplyElement(savedRepliesContainer);
  
    for (const [index, reply] of savedReplies.entries()){

        let newElement = 
            createNewSavedReplyElementFromExistingElment(lastSavedReplyElement, reply, index);

        savedRepliesDivs.push(newElement);
    }

    return savedRepliesDivs;
}

const addNewSavedReplyElementToContainer = (savedRepliesContainer,savedReplyElement ) => {
    
    savedRepliesContainer.appendChild(savedReplyElement);
}

const getElementSavedReplyName = (element) =>{

    return element.getAttribute(`saved-reply-name`);
}

const getSavedReplyTitleSpan = (savedReplyDiv) => {

}

const getSavedReplyTemplateString = (savedReplyDiv) =>{
    
    let bodySpan = savedReplyDiv.querySelectorAll(`span`)[1]
    
    let decodedTemplate = bodySpan.innerText
        .replace(/(\\uFFFD)+/gi,'<br />');

    return decodedTemplate;
}

const addEventListenerToSavedReplyDiv = (savedReplyDiv, textAreaElement) =>{
    
    let templateString = getSavedReplyTemplateString(savedReplyDiv, textAreaElement);
       
    savedReplyDiv.addEventListener(`click`, function(e){

        textAreaElement.innerHtml = templateString;

        console.log("text area value", textAreaElement.value);

    });

}

const getCommentTextAreaElement = () => {

    let textAreaElement =
    document.querySelector(
        `div[data-testid="markdown-editor-comment-composer"] textarea`);

    return textAreaElement;
}

const addNewSavedRepliesToNestedIssuesContainer = (savedRepliesDivs, savedRepliesContainer) =>{
   
    let textAreaElement = getCommentTextAreaElement();

    for (const savedReplyDiv of savedRepliesDivs){

        let savedReplyName = savedReplyDiv.getAttribute(`saved-reply-name`);

        let matchingDiv = savedRepliesContainer.querySelector(`div[saved-reply-name="${savedReplyName}"]`);

        if(!matchingDiv){

            addEventListenerToSavedReplyDiv(savedReplyDiv, textAreaElement);

            savedRepliesContainer.appendChild(savedReplyDiv);
        }
     }
}

const removeNewSavedRepliesToNestedIssuesContainer = () =>{
    
}