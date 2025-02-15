var currentUrl;

const setCurrentActiveURL = async (url, callback) =>{  
    
    await chrome.storage.local.set({ [`currentActiveUrl`]: url });
    
    console.log("currentUrl changed", currentUrl);
    
    if(callback !== undefined){

        callback();
    }
} 

const getCurrentActiveURL = async () =>{

    const results =  await chrome.storage.local.get([`currentActiveUrl`]);

    return results[`currentActiveUrl`];
}

const isGitHubIssueUrl = (url) => {

    if(url === null){
        url = window.location.href;
     }
 
     const issueUrlPattern = /^(https?:\/\/)github\.com\/.+\/.+\/issues\/\d+/i;
 
     const projectIssueUrlPattern = /^https:\/\/github.com\/(orgs|users)\/(?<owner>\w+)\/projects\/\d+(?:.*)(?:[?|&]pane=\S+&*)(?:issue=\S+)/i;
 
     return issueUrlPattern.test(url) || projectIssueUrlPattern.test(url);
}

const isGitHubPullRequestUrl = (url) => {

    if(url === null){
        url = window.location.href;
     }

    let pattern = /^(https?:\/\/)github\.com\/.+\/.+\/pull\/\d+/i;

    return pattern.test(url);
}

const isLocalhostUrl = (url) => {
    
    if(url === null){
        url = window.location.href;
    }

    let pattern = /^(https?:\/\/)localhost(:\d+).*/i;

    return pattern.test(url);
}

const getGitHubOwner = (url) => {
    
    if(url === null){
        url = window.location.href;
    }

    const issueOrPrOwnerPattern = /https:\/\/github.com\/(?<owner>[\w]+)\/\w+\/(pull|issues)\/.+/i

    if(issueOrPrOwnerPattern.test(url)){
       
        const matches = url.match(issueOrPrOwnerPattern);

        return matches?.groups['owner'];
    }

    const projectIssuetOwnerPattern = /https:\/\/github.com\/(orgs|users)\/(?<owner>\w+)\/projects\/\d+(?:.*)(?:[?|&]pane=\S+&*)(?:issue=\S+)/i
    
    if(projectIssuetOwnerPattern.test(url)){
       
        const matches = url.match(projectIssuetOwnerPattern);

        return matches?.groups['owner'];
    }
}

const canLoadRepliesForUrl = (config,url) => {

    console.log("evaluating can load replies from url", url);

    if(url === null){
        url = window.location.href;
    }

    //this if for unit tests
    if(isLocalhostUrl(url)){
        return true;
    }

    const gitHubOwner = getGitHubOwner(url);

    if(gitHubOwner === undefined){
        return false;
    }

    const validOwner = config.allowEverywhere || gitHubOwner.localeCompare(config.limitToGitHubOwner,undefined,{ sensitivity : `base`}) === 0 ? true : false;

    console.log("validOwner",validOwner);

    const validForIssue = (isGitHubIssueUrl(url) && config.includeIssues);

    console.log("validForIssue",validForIssue);

    const validForPullRequest = (isGitHubPullRequestUrl(url) && config.includePullRequests);

    console.log("validForPullRequest",validForPullRequest);

    if (validOwner
        && (validForIssue || validForPullRequest)) {

        return true;
    }

    return false;
}

