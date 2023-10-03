
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

const getSavedRepliesFromUrl = async (savedRepliesUrl) => {
        
    const response = await fetch(savedRepliesUrl);

    const json = await response.json();
    
    const html = json.payload.blob.richText;

    var parser = new DOMParser();

    var doc = parser.parseFromString(html, "text/html");

    let h2s = Array.from(doc.querySelectorAll(`h2[tabindex='-1']`));

    let savedReplies = [];

    for (let i = 0; i < h2s.length; i++) {

        let h2 = h2s[i];

        let savedReplyBody = getSavedReplyBody(h2);

        if(savedReplyBody){

            savedReplies.push({name:h2.innerText,bodh:savedReplyBody});
        }
    }

    return savedReplies;
}

const updateSavedReplies = async () => {

    const savedReplies = await getSavedRepliesFromGitHub();

    if(savedReplies) {
        await addSavedRepliesToLocalStorage(savedReplies);
    }

    return savedReplies;
}

const getSavedReplies = async (useCache = false) => {

    if (useCache === true) {

        const cachedSavedReplies = await getSavedRepliesFromLocalStorage();

        if (cachedSavedReplies) {

            return cachedSavedReplies;
        }
    }

    return await updateSavedReplies();
}
