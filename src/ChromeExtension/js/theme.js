console.log(`themes loaded`);

const defautTheme = `default`;

const themes = [`default`,`peach`,`green`,`lilac`,`skeletor`,`retro`,`brown`];

const isValidTheme = (theme) =>{
    
    return themes.includes(theme);
}

const getCurrentTheme = async () => {

    console.log(`get current theme`);

    const appliedThemeResult = await chrome.storage.local.get([`applied-theme`]);

    const appliedTheme = appliedThemeResult[`applied-theme`];

    if(isNullOrEmpty(appliedTheme)){
        return defautTheme;
    }

    return appliedTheme;
}

const setDarkMode = async (enableDarkMode) => {
   
    console.log(`set darkMode ${enableDarkMode}`);

    const bodyElement = document.querySelector(`body`);

    if(enableDarkMode){
        bodyElement?.classList?.add(`dark`);  
    }else{
        bodyElement?.classList?.remove(`dark`);  
    }
}

const applyTheme = (theme,enableDarkMode) => {
    
    console.log(`apply theme ${theme}`);

    if(!isValidTheme(theme)){
        
        console.log(`Cannot apply theme. ${theme} is not a valid theme.`);
    }

    const bodyElement = document.querySelector(`body`);

    bodyElement.classList = ``;

    bodyElement.classList.add(theme.toLowerCase());

    setDarkMode(enableDarkMode);
}

const isDarkModeEnabled = async () =>{
    
    console.log(`check if dark mode is enabled`);

    const result = await chrome.storage.local.get([`enable-dark-mode`]);

    const darkModeEnabled = result[`enable-dark-mode`];

    console.log(`result of checking for dark mode ${darkModeEnabled}`)

    if(!darkModeEnabled || darkModeEnabled === undefined){
        return false;
    }

    return darkModeEnabled;
}

const applyDarkMode = async (enableDarkMode) => {
   
    console.log(`set darkMode ${enableDarkMode}`);

    const bodyElement = document.querySelector(`body`);

    if(enableDarkMode){
        bodyElement?.classList?.add(`dark`);  
    }
}

const applyCurrentTheme = async () => {
    
    console.log(`apply current theme`);

    const currentTheme = await getCurrentTheme()

    await applyTheme(currentTheme);

    const darkModeEnabled = await isDarkModeEnabled();

    applyDarkMode(darkModeEnabled);
}