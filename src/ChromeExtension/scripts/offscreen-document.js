
const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';

const closeOffscreenDocument = async () => {
    if (!(await hasDocument())) {
        return;
    }
    await chrome.offscreen.closeDocument();
}

async function hasDocument() {
    // Check all windows controlled by the service worker if one of them is the offscreen document
    const matchedClients = await clients.matchAll();
    for (const client of matchedClients) {
        if (client.url.endsWith(OFFSCREEN_DOCUMENT_PATH)) {
            return true;
        }
    }
    return false;
}

const sendMessageToOffscreenDocument = async (sendMessage) => {
    // Create an offscreen document if one doesn't exist yet
    console.log("send message to offscreen document");
    if (!(await hasDocument())) {
        await chrome.offscreen.createDocument({
            url: OFFSCREEN_DOCUMENT_PATH,
            reasons: [chrome.offscreen.Reason.DOM_PARSER],
            justification: 'Parse DOM'
        });
        console.log("created off screen document");
    }
    // Now that we have an offscreen document, we can dispatch the
    // message.
    
    await sendMessage();

}