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
 
     const projectIssueUrlPattern = /^https:\/\/github.com\/(orgs|users)\/(?<owner2>\w+)\/projects\/\d+.*((\?|&)issue=(?<owner>\w+)%7C(?<repo>\w+)%7C(?<issue>\d+))/i;

     const assignedIssueUrlPattern = /^https:\/\/github.com\/issues\/assigned\?issue=(?<owner>\S+)%7C(?<repo>\S+)%7c(?<issue>\d+)/i;

     return issueUrlPattern.test(url) || projectIssueUrlPattern.test(url) || assignedIssueUrlPattern.test(url);
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

    const projectIssuetOwnerPattern = /^https:\/\/github.com\/(orgs|users)\/(?<owner2>\w+)\/projects\/\d+.*((\?|&)issue=(?<owner>\w+)%7C(?<repo>\w+)%7C(?<issue>\d+))/i
    
    if(projectIssuetOwnerPattern.test(url)){
       
        const matches = url.match(projectIssuetOwnerPattern);

        return matches?.groups['owner'];
    }

    const assignedIssuesOwnerPattern = /^https:\/\/github.com\/issues\/assigned(?:[?|&]issue=(?<owner>\w+)%7C(?<repo>\w+)%7C(?<issueNumber>\d+))/i;
    
    if(assignedIssuesOwnerPattern.test(url)){
       
        const matches = url.match(assignedIssuesOwnerPattern);

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

export { setCurrentActiveURL, getCurrentActiveURL, isGitHubIssueUrl, isGitHubPullRequestUrl, isLocalhostUrl, getGitHubOwner, canLoadRepliesForUrl };