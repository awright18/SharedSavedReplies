
const isGitHubIssueUrl = () => {

    let url = window.location.href;

    let pattern = /^(https?:\/\/)github\.com\/.+\/.+\/issues\/\d+/i;

    return pattern.test(url);
}

const isLocalhostUrl = () => {
    let url = window.location.href;

    let pattern = /^(https?:\/\/)localhost(:\d+).*/i;

    return pattern.test(url);
}

const isValidIssueUrl = () => {

    if(isLocalhostUrl()){
        return true;
    }
    
    if(isGitHubIssueUrl()){
        return true; 
    }
    
    return false;
}