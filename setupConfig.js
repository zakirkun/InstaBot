let setupConfig = async (filePath) => {
    const chalk = require("chalk");
    const fs = require('fs');
    const readline = require('readline');

    let input = async (question) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const answer = await new Promise((resolve) => {
            rl.question(question, (input) => {
                resolve(input);
                rl.close()
            });
        });
        return answer;
    }

    let con = await input(chalk.bold.blue("Did you configure the 'config.json' file? [Y/N]:"))

    if (con.trim().toUpperCase() == 'Y') {
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
        let count = Number.parseInt(await input(chalk.bold.green("Enter the number of Accounts:")))
        for (let i = 0; i < count; i++) {
            config.username.push((await input(chalk.bold.blue(`Enter Username[${i + 1}]:`))).trim());
            config.password.push((await input(chalk.bold.blue(`Enter Password[${i + 1}]:`))).trim());
            console.log("")
        }

        // take comments 
        count = Number.parseInt(await input(chalk.bold.green("Enter the number of Comments:")))
        for (let i = 0; i < count; i++) {
            config.comment.push(await input(chalk.bold.blue(`Enter Comment[${i + 1}]:`)));
            console.log("")
        }

        // take hashtag
        count = Number.parseInt(await input(chalk.bold.green("Enter the number of Hashtags:")))
        for (let i = 0; i < count; i++) {
            config.hashtag.push((await input(chalk.bold.blue(`Enter the Hashtag[${i + 1}] (Without #):`))).trim())
            console.log("")
        }

        // take other data
        console.log(chalk.bold.green("Enter some basic details:"))
        config.maxComment = Number.parseInt(await input(chalk.bold.blue("Enter the number of MaxComment:")))
        console.log("")
        config.maxFailed = Number.parseInt(await input(chalk.bold.blue("Enter the number of MaxFailed:")))
        console.log("")
        config.CommentSleep = Number.parseInt(await input(chalk.bold.blue("Enter the number of CommentsSleep(in sec):")))
        console.log("")
        config.refreshTagAfterPost = Number.parseInt(await input(chalk.bold.blue("Enter number of posts for per-tag refresh:")))
        console.log("")

        // Write config.json file
        fs.writeFileSync(`${filePath}config.json`, JSON.stringify(config))
    }
}

module.exports = { setupConfig };