# Committer

This is a small utility to help you structure your commits. 

- Each commit is started with at least one Emoji update
- Ticket Number
    - Must be an integer
- Title
    - less than 50 characters
    - end period removed
    - first letter capitalized
- Description

# Requirements

- NodeJs
- [Inquirer](https://github.com/SBoudrias/Inquirer.js/)
- Git in environment path

# Use

The simple script just creates prompts for the inputs, cleans, formats and commits the message assuming git is in your environment path. It is recommended to just make a git alias to call the file. Be sure to install the depedencies before running.

.gitconfig
```
[alias]
    committer = !node /path/to/commiter.js
```