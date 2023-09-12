
const isParticularGitHubIssueUrl = () => {

    let url = window.location.href;

    let pattern = /^(https?:\/\/)github\.com\/particular\/[\dA-z\.-]+\/issues\/\d+/i;

    return pattern.test(url);
}

const isLocalhostUrl = () => {
    let url = window.location.href;

    let pattern = /^(https?:\/\/)localhost(:\d+)?\/?([\dA-z\-]+)?(\.[A-z]+)?$/i;

    return pattern.test(url);
}

const gitHubDataUrl = "https://github.com/Particular/StaffSuccess/blob/master/github/saved-reply-templates.md";

const localDataUrl = () => {
    var url = window.location;
    var dataUrl = `${url.protocol}//localhost:${url.port}/fake-response.json`;
    return dataUrl;
}

const getTemplateDataUrl = () => {
    
    if(isLocalhostUrl()){
       return localDataUrl(); 
    }
    
    if(isParticularGitHubIssueUrl){
        return gitHubDataUrl;
    }
}

const isValidIssueUrl = () => {

    if(isLocalhostUrl()){
        return true;
    }
    
    if(isParticularGitHubIssueUrl()){
        return true; 
    }
    
    return false;
}