const OFFSCREEN_DOCUMENT_PATH = 'pages/offscreen/offscreen.html';

const closeOffscreenDocument = async () => {
    if (!(await hasDocument())) {
        return;
    }
    
    console.log("closing offscreen document");
    
    await chrome.offscreen.closeDocument();
}

const hasDocument = async () => {
  
  // Check all windows controlled by the service worker to see if one 
  // of them is the offscreen document with the given path
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);
  console.log(offscreenUrl);

  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl]
  });

  if (existingContexts.length > 0) {
    return true;
  }

  return false;
}

let creating; // A global promise to avoid concurrency issues
const setupOffscreenDocument = async () => {

  if(await hasDocument()){
    return; 
  }

  // of them is the offscreen document with the given path
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);

  // create offscreen document
  if (creating) {
    
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: offscreenUrl,
      reasons: [chrome.offscreen.Reason.DOM_PARSER],
      justification: 'parsing the DOM',
    });
    await creating;
    creating = null;
  }
}

const sendMessageToOffscreenDocument = async (sendMessage) => {
    // Create an offscreen document if one doesn't exist yet
    console.log("send message to offscreen document");

    await setupOffscreenDocument();
    
    console.log("offscreen document created");

    await sendMessage();

    return true;

}