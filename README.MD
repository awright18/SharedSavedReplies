## What is Shared Saved Replies

Shared Saved Replies is a chrome extension that allows teams to create `saved replies` for use on GitHub.com. It will populate the saved replies list when adding a new comment to an issue or pull request in a GitHub repository. For teams that are continuously evolving the structure and requirements of their saved replies templates this extension will keep the saved replies up to date, by updating and caching them on a schedule set up the user.

![Saved Replies Example](https://github.com/awright18/SharedSavedReplies/blob/main/src/ChromeExtension/images/main_screen_shot.png)

## How do I use it? 

### Create saved reply templates

To create a saved reply template create a mark down file in a GitHub repository. 

1. Add a saved reply name in an h2. 

1. Add a markdown code block immediately after the H2 saved reply name. 

1. commit the file to repostiory and make sure its a .md file accessible at GitHub.com 
   - This file can be used with private organizations, the people using the template will need to have permssions to the org or repo in able to be able to share the saved replies. 

Instructions for use and multiple saved replies can be added in the same file. The extension is looking for the H2 (##) followed by the markdown code section pattern in a .md file. 

#### Example Saved Reply Temple

<pre>
# our Teams Saved Replies

These replies are to be used by our team to facilitate consistent communication. 

## Work Started
```markdown 
<!-- Fill out the following information -->

## 🚀 Work Started 

### 📝 High level plan

<!-- include any details that may be useful for other reading this comment -->

### ⏲ Update schedule 

<!-- How often do you plan to communicate updates -->
```

## Work Completed
```markdown
## 🎉Work Complete

<!-- share any information that may be valuable to people reading this message 
  including include related issues, prs, or any other details -->
```
</pre>

### Using the extension

#### Install and configure the extension

1. Install the extension. 
1. Pin the extension.
1. Click on the pinned extension icon.
1. Click the plus button. 

![Popup Screen](https://github.com/awright18/SharedSavedReplies/blob/main/src/ChromeExtension/images/popup.png)

1. For "Saved Replies Url": Enter the GitHub url of the the saved replies .md file that was created prevoulsy. (This should not be the raw url).
1. For "Name", Provide a unique name for the configuration. 
1. For "Use with all GitHub repositories" If the saved replies should be used across all of GitHub then switch the toggle to on. If not switch it off and enter the name of a github organization or user that you want to limit the replies to in "Limit to this GitHub organization or user" 
1. For "Applies to Issues" If the saved replies should show for issues switch the toggle on, if they shouldn't be shown for issues switch the toggle to off. 
2. For "Applies to Pull Request" If the saved replies should show for pull requests switch the toggle on, if they shouldn't be shown for pull requests switch the toggle to off. 
1. Set the refresh rate of how often the saved replies will be updated. The default is every 30 minutes. (This process only takes a few hundred milliseconds to perform.)
1. Click save.

![Add Saved Replies Screen](https://github.com/awright18/SharedSavedReplies/blob/main/src/ChromeExtension/images/Add_Screen.png)


#### Use the saved replies

1. Navigate to either an issue or pull request and clicked the "saved replies" icon on the new comment menu and see your saved replies appear. 

![Click on Save Replies Icon](https://github.com/awright18/SharedSavedReplies/blob/main/docs/images/click_saved_replies_icon.png)