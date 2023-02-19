let botIntro = async () => {

    const chalk = require("chalk");
    const prompt = require('prompt-sync')();
    const delay = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    let con = prompt(chalk.bold.blue("Did you watch the introduction? [Y/N]:"))
    console.clear()
    if (con.toUpperCase() != 'N') {
        // Define the intro string
        let title = chalk.bold.green(`WELCOME TO
    _____   ________________    ____  ____  ______
   /  _/ | / / ___/_  __/   |  / __ )/ __ \\/_  __/
   / //  |/ /\\__ \\ / / / /| | / __  / / / / / /   
 _/ // /|  /___/ // / / ___ |/ /_/ / /_/ / / /    
/___/_/ |_//____//_/ /_/  |_/_____/\\____/ /_/
    `)

        let introduction = chalk.bold.blue(`INTRODUCTION:\nAn Instagram bot is a program that can automate tasks on the platform. One popular use case of an Instagram bot is to comment on posts with a specific hashtag. The bot can be set up to automatically search for posts with the hashtag and leave a pre-defined comment on those posts.`)

        console.clear()
        console.log(title)
        for (let i = 0; i < introduction.length; i++) {
            process.stdout.write(introduction[i]);
            await delay(40)
        }


        let disclaimer = chalk.bold.red(`DISCLAIMER:
1: The use of this program and the Instagram bot it contains is at your own risk. I, as the developer, am not responsible for any actions taken by the bot or any consequences that may result from using it. 

2: Please use this program responsibly and in accordance with Instagram's terms of service. The bot should not be used to spam or harass other users. The bot is intended for entertainment purposes only. 

3: By using this program, you acknowledge that you are solely responsible for any actions taken by the bot, and that you will not hold me liable for any damages or legal issues that may result from using it.
`)

        await delay(3000)
        console.clear()
        console.log(title)
        for (let i = 0; i < disclaimer.length; i++) {
            process.stdout.write(disclaimer[i]);
            await delay(40)
        }

        let advise = chalk.bold.blue(`ADVISE:
1: If you are using InstaBot for the first time or need to reconfigure of details, please make sure to configure the 'config.json' file.

2: If you find that your bot is consistently producing incomplete or failed comments or show status as 'done' without maxFailed or maxComment completion, it's important to take the time to revive your account or some changes to need in your comment for generating high-quality comments that provide value to the conversation. This error occurred because Instagram can treate your comments as spam.

3: Using bots within appropriate limits ensures a positive user experience and prevents potential issues.

4: Increase the delay/CommentSleep time in your bot.

5: If your IDs continue to give errors, it is strongly recommended that you do not use them next time.

6: To ensure that your bot is functioning correctly, it's important to regularly check the error log file located in the 'errors' directory. 
`)

        await delay(3000)
        console.clear()
        console.log(title)
        for (let i = 0; i < advise.length; i++) {
            process.stdout.write(advise[i]);
            await delay(40)
        }

        await delay(3000)
    }
}
module.exports = { botIntro };