const canLoadSavedRepliesForURL = async (url) =>{

    const configs = await getConfigsFromLocalStorage();

    for(let config of configs){

        const result = canLoadRepliesForUrl(config, url);

        if(result){
            return true;
        }
    }

    return false;
}