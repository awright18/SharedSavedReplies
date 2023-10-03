const isGitHubIssueUrl = () => {

    let url = window.location.href;

    let pattern = /^(https?:\/\/)github\.com\/.+\/.+\/issues\/\d+/i;

    return pattern.test(url);
}

const isGitHubPullRequestUrl = () => {

    let url = window.location.href;

    let pattern = /^(https?:\/\/)github\.com\/.+\/.+\/pull\/\d+/i;

    return pattern.test(url);
}

const isLocalhostUrl = () => {
    let url = window.location.href;

    let pattern = /^(https?:\/\/)localhost(:\d+).*/i;

    return pattern.test(url);
}

const getGitHubOwner = () => {
    const url = window.location.href;

    const expression = /https:\/\/github.com\/(?<owner>[^\/]+)?(.*)/i

    const matches = url.match(expression);

    const owner = matches?.groups['owner'];

    return owner;
}

const canLoadRepliesForUrl = (config) => {

    //this if for unit tests
    if(isLocalhostUrl()){
        return true;
    }

    const gitHubOwner = getGitHubOwner();

    const validOwner = config.allowEverywhere || gitHubOwner.localeCompare(config.limitToGitHubOwner,undefined,{ sensitivity : `base`}) === 0 ? true : false;

    const validForIssue = (isGitHubIssueUrl() && config.includeIssues);

    const validForPullRequest = (isGitHubPullRequestUrl() && config.includePullRequests);

    if (validOwner
        && (validForIssue || validForPullRequest)) {

        return true;
    }

    return false;
}