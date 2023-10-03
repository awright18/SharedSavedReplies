import { isNullOrEmpty, arrayIsNullOrEmpty } from "./null.js";

console.log(`themes loaded`);

const defautTheme = `peach`;

const themes = [`default`,`peach`,`green`,`lilac`,`skeletor`,`retro`,`brown`];

const isValidTheme = (theme) =>{
    
    return themes.includes(theme);
}

const getCurrentTheme = async () => {

    console.log(`get current theme`);

    const result = await chrome.storage.local.get([`applied-theme`]);

    const appliedTheme = result[`applied-theme`];

    if(isNullOrEmpty(appliedTheme)){
        return defautTheme;
    }

    return appliedTheme;
}

const applyTheme = async (theme) => {
    
    console.log(`apply theme ${theme}`);

    if(!isValidTheme(theme)){
        
        console.log(`Cannot apply theme. ${theme} is not a valid theme.`);
    }

    const bodyElement = document.querySelector(`body`);

    bodyElement.classList = ``;

    bodyElement.classList.add(theme.toLowerCase());
}

const applyCurrentTheme = async () => {
    
    console.log(`apply current theme`);

    const currentTheme = await getCurrentTheme()

    await applyTheme(currentTheme);
}

export { themes,getCurrentTheme, applyCurrentTheme, applyTheme }