import { themes,applyTheme } from "../../js/modules/theme.js";

const initialize = async () => {

    console.log("options init");
    const themesElement = document.querySelector(`select`);

    for (let theme of themes){
        
        var option = document.createElement('option');
        
        option.value = theme;
        
        option.innerHTML = theme;
        
        if(theme === `default`){
        
            option.setAttribute(`selected`,``);
        }
        
        themesElement.appendChild(option);
    }

    themesElement.addEventListener(`change`, async (event) => await applyTheme(event.target.value));
}

await initialize();