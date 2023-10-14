const isGitHubPermissionEnabled = async () => {
    
    const hasGitHubPermissions = await browser.permissions.contains(
        {origins:["*://*.github.com/*",
                  "https://github.com/*"]}
    );

    if(hasGitHubPermissions){
        return true;
    }

    return false;
}

const requestGitHubPermissions = async () => {
    
    const response = await browser.permissions.request(
        {origins:["*://*.github.com/*",
                  "https://github.com/*"]}
    );

    return response;
}

export { isGitHubPermissionEnabled, requestGitHubPermissions }