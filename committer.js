'use strict';
var inquirer = require('inquirer');
var exec = require('child_process').exec, child;

// Question Keys
const UPDATES_KEY = 'updates';
const TICKET_KEY = 'ticket';
const TITLE_KEY = 'title';
const DESCRIPTION_KEY = 'description';

// Options
const options = [
    {
        name: '✨ New Features',
        value: '✨'
    },
    {
        name: '🎨 Improving the format/structure of the code',
        value: '🎨'
    },
    {
        name: '🐎 Improving performance',
        value: '🐎'
    },
    {
        name: '📚 Writing docs',
        value: '📚'
    },
    {
        name: '🐛 Reporting a bug',
        value: '🐛'
    },
    {
        name: '🚑 Fixing a bug',
        value: '🚑'
    },
    {
        name: '🐧 Fixing something on Linux',
        value: '🐧'
    },
    {
        name: '🍎 Fixing something on Mac OS',
        value: '🍎'
    },
    {
        name: '🏁 Fixing something on Windows',
        value: '🏁'
    },
    {
        name: '💀 Deprecating code',
        value: '💀'
    },
    {
        name: '🚮 Removing code or files',
        value: '🚮'
    },
    {
        name: '🚨 Adding tests',
        value: '🚨'
    },
    {
        name: '💚 Fixing the CI build',
        value: '💚'
    },
    {
        name: '🔒 Dealing with security',
        value: '🔒'
    },
    {
        name: '⬆️ Upgrading dependencies',
        value: '⬆️'
    },
    {
        name: '⬇️ Downgrading depedencies',
        value: '⬇️'
    },
    {
        name: '💄 Cosmetic changes',
        value: '💄'
    },
    {
        name: '🚧 Work in progress',
        value: '🚧'
    },
    {
        name: '🚀 Build and Deployment change',
        value: '🚀'
    },
    {
        name: '🎉 Initial commit',
        value: '🎉'
    }
];

// Functions
function formatTitle(title) {
    // Remove period from end
    if (title.substring(title.length - 1) === '.') {
        title = title.substring(0, title.length - 1);
    }

    // Captialize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);

    return title;
}

function formatDescription(description) {
    description.replace('\\n', '\n');

    return description;
}

function createGitMessage(updates, ticket, title, description) {
    return 'git commit -m "' + updates.join(' ') + ' ' + title + '" -m "' + description + '" -m "refs #' + ticket + '"';
}

// Questions - Main
inquirer.prompt([
    {
        type: 'checkbox',
        name: UPDATES_KEY,
        message: 'Select updates',
        choices: options,
        validate: function (answer) {
            if (answer.length < 1) {
                return 'You must choose at least one change.';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: TICKET_KEY,
        message: 'Ticket Number',
        validate: function (answer) {
            if (isNaN(answer)) {
                return 'You must insert an integer';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: TITLE_KEY,
        message: 'Commit Title',
        validate: function (answer) {
            if (answer.length == 0) {
                return 'Commit title cannot be empty';
            }

            if (answer.length > 50) {
                return 'Commit title should not be longer than 50 chars';
            }

            return true;
        }
    },
    {
        type: 'input',
        name: DESCRIPTION_KEY,
        message: 'Optional Commit Description'
    }
]).then(function (answers) {
    answers[TITLE_KEY] = formatTitle(answers[TITLE_KEY]);

    child = exec(createGitMessage(answers[UPDATES_KEY], answers[TICKET_KEY], answers[TITLE_KEY], answers[DESCRIPTION_KEY]), function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);


        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});