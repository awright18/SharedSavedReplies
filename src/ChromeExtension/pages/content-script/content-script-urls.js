const shouldLoadContentScript = (url) => {

    return isLocalhostUrl(url) || isGitHubIssueUrl(url) || isGitHubPullRequestUrl(url);
}   