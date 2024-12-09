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

const setSavedReplyId = (element,calculatedId) => {
 
    element.id = calculatedId;
}

const setSavedReplyTitle = (titleSpan, title) => {
     
    titleSpan.innerText = title;
}

const setSavedReplyBody = (bodySpan, body) => {

    bodySpan.innerText = body;
}

const createNewSavedReplyElementFromExistingElment = (templateElement, savedReply, index) => {

    let newSavedReplyElement = templateElement.cloneNode(true);
    
    let savedReplySpans = newSavedReplyElement.querySelectorAll(`span`);

    let titleSpan = savedReplySpans[0];

    let bodySpan = savedReplySpans[1];

    setSavedReplyTitle(titleSpan, savedReply.name);
    
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

const addNewSavedRepliesToNestedIssuesContainer = (savedRepliesDivs, savedRepliesContainer) =>{
    
    for (const savedReplyDiv of savedRepliesDivs){
        savedRepliesContainer.appendChild(savedReplyDiv);
     }
}

const removeNewSavedRepliesToNestedIssuesContainer = () =>{
    
}