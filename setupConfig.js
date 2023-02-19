let setupConfig = async (filePath) => {
    const chalk = require("chalk");
    const prompt = require('prompt-sync')();
    const fs = require('fs');

    let con = prompt(chalk.bold.blue("Did you configure the 'config.json' file? [Y/N]:"))

    if (con.toUpperCase() == 'Y') {
        console.clear()
        let config = {
            "username": [],
            "password": [],
            "hashtag": [],
            "comment": [],
            "maxComment": null,
            "maxFailed": null,
            "CommentSleep": null,
            "refreshTagAfterPost": null
        }

        // take username and password
        let count = Number.parseInt(prompt(chalk.bold.green("Enter the number of Accounts:")))
        for (let i = 0; i < count; i++) {
            config.username.push(prompt(chalk.bold.blue(`Enter Username[${i + 1}]:`)).trim());
            config.password.push(prompt(chalk.bold.blue(`Enter Password[${i + 1}]:`)).trim());
            console.log("")
        }

        // take comments 
        count = Number.parseInt(prompt(chalk.bold.green("Enter the number of Comments:")))
        for (let i = 0; i < count; i++) {
            config.comment.push(prompt(chalk.bold.blue(`Enter Comment[${i + 1}]:`)));
            console.log("")
        }

        // take hashtag
        count = Number.parseInt(prompt(chalk.bold.green("Enter the number of Hashtags:")))
        for (let i = 0; i < count; i++) {
            config.hashtag.push(prompt(chalk.bold.blue(`Enter the Hashtag[${i + 1}] (Without #):`)).trim())
            console.log("")
        }

        // take other data
        console.log(chalk.bold.green("Enter some basic details:"))
        config.maxComment = Number.parseInt(prompt(chalk.bold.blue("Enter the number of MaxComment:")))
        console.log("")
        config.maxFailed = Number.parseInt(prompt(chalk.bold.blue("Enter the number of MaxFailed:")))
        console.log("")
        config.CommentSleep = Number.parseInt(prompt(chalk.bold.blue("Enter the number of CommentsSleep(in sec):")))
        console.log("")
        config.refreshTagAfterPost = Number.parseInt(prompt(chalk.bold.blue("Enter number of posts for per-tag refresh:")))
        console.log("")

        // Write config.json file
        fs.writeFileSync(`${filePath}config.json`, JSON.stringify(config))
    }
}

module.exports = { setupConfig };