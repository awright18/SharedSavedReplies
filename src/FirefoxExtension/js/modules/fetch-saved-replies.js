
const getSavedReplyBody = (h2) =>{
    let next = h2.nextElementSibling;

    while(next){

        if(next.tagName === 'H2')
        {
            return null;
        }

        if (next.matches('.highlight')){

            next.querySelector('pre')

            return next.innerText;
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

    console.log(`fetching from ${url}`);

    if(!url){
        throw new Error("savedRepliesUrl does not exist");
    }
        
    const response = await fetch(savedRepliesUrl);

    const html = await tryParseReplies(response);

    var parser = new DOMParser();

    let savedReplies = [];

    if(parser){

        console.log("created parser");

        var doc = parser.parseFromString(html, "text/html");

        let h2s = Array.from(doc.querySelectorAll(`h2[tabindex='-1']`));       

        for (let i = 0; i < h2s.length; i++) {

            let h2 = h2s[i];

            let savedReplyBody = getSavedReplyBody(h2);

            if(savedReplyBody){

                savedReplies.push({name:h2.innerText,body:savedReplyBody});
            }
        }
    }

    return savedReplies;
}

export {fetchSavedRepliesFromUrl}
