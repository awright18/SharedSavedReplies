
const getSavedReplyBody = (headingContainer) =>{
    
    let next = headingContainer.nextElementSibling;

    while(next){

        if(next.matches('.markdown-heading:has(h2.heading-element)'))
        {
            return null;
        }

        if (next.matches('.highlight')){

            let pre = next.querySelector('pre');

            if(pre != null && pre.innerText.startsWith(`##`))
            {
                return next.innerText;
            }
        }

        next = next.nextElementSibling;
    }

    return null;
}

const tryParseReplies = async (response) => {

    if(!response){
        return false;
    }

    const json = await response.json();

    if(response.ok && json){
        return json.payload.blob.richText;
    }

    throw new Error("Problem parsing response");
}

const fetchSavedRepliesFromUrl = async (savedRepliesUrl) => {
    
    const url = new URL(savedRepliesUrl);

    if(!url){
        throw new Error("savedRepliesUrl does not exist");
    }
        
    const response = await fetch(savedRepliesUrl);

    const html = await tryParseReplies(response);

    var parser = new DOMParser();

    var doc = parser.parseFromString(html, "text/html");

    let divContainingHeaders = Array.from(doc.querySelectorAll(`div.markdown-heading:has(h2.heading-element):has(~ div.highlight`));

    let savedReplies = [];

    for (let i = 0; i < divContainingHeaders.length; i++) {

        let h2 = divContainingHeaders[i].querySelector(`h2.heading-element`);

        let savedReplyBody = getSavedReplyBody(divContainingHeaders[i]);

        if(savedReplyBody){

            savedReplies.push({name:h2.innerText,body:savedReplyBody});
        }
    }

    if(savedReplies.length === 0){
        console.warn('no saved replies found. There might be a parsing error.');
    }

    return savedReplies;
}

export {fetchSavedRepliesFromUrl}
