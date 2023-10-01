
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

    const expression = /https:\/\/github.com\/(?<owner>.+)\//

    const matches = url.match(expression);

    const owner = matches?.groups['owner'];

    return owner;
}

const canLoadRepliesForUrl = (config) => {

    const gitHubOwner = getGitHubOwner();

    const validOwner = config.allowEverywhere || gitHubOwner === config.owner ? true : false;

    const validForIssue = (isGitHubIssueUrl() && config.includeIssues);

    const validForPullRequest = (isGitHubPullRequestUrl() && config.includePullRequests);

    if (validOwner
        && (validForIssue || validForPullRequest)) {

        return true;
    }

    return false;
}


const isValidIssueUrl = () => {

    if (isLocalhostUrl()) {
        return true;
    }

    if (isGitHubIssueUrl()) {
        return true;
    }

    return false;
}