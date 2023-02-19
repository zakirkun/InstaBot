const { IgApiClient } = require("instagram-private-api");
const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs");

const ig = new IgApiClient();

class instagram {
    constructor(username, password, filePath) {
        this.username = username;
        this.password = password;
        this.filePath = filePath;
    }

    async login() {
        try {
            try {
                let session = fs.readFileSync(`${this.filePath}sessions/${this.username}.json`, 'utf-8')
                session = JSON.parse(session);
                await ig.state.deserialize(session)
                fs.writeFileSync(`${this.filePath}sessions/${this.username}.json`, JSON.stringify(await ig.state.serialize()))
                let user = await ig.account.currentUser()
                print(`${chalk.bold.green(`#LOAD-FROM-SESSION--------->`)}`);
                await delay(5000)
            } catch (error) {
                ig.state.generateDevice(this.username);
                const login = await ig.account.login(this.username, this.password);
                fs.writeFileSync(`${this.filePath}sessions/${this.username}.json`, JSON.stringify(await ig.state.serialize()))
                print(`${chalk.bold.green(`#GENERATE-NEW-SESSION------>`)}`);
                await delay(5000)
                return Promise.resolve(login);

            }
        } catch (err) {
            if (err.message.match(/challenge_required/i)) {
                console.log(chalk`{yellow [!] Challenge required!}`);
                try {
                    await ig.challenge.auto(true);
                    const { code } = await inquirer.prompt({
                        type: "input",
                        name: "code",
                        message: "⌭ Input verification code (check it in email or sms):",
                        validate: (val) => /[0-9]/.test(val) || "Only input numbers!",
                    });
                    const verify = await ig.challenge.sendSecurityCode(code);
                    return Promise.resolve(verify.logged_in_user);
                } catch (chErr) {
                    return Promise.reject(chErr.message);
                }
            } else return Promise.reject(err.message);
        }
    }

    async mediaInfo(mid) {
        try {
            const info = await ig.media.info(mid);
            return Promise.resolve(info);
        } catch (err) {
            return Promise.reject(err.message);
        }
    }

    async tagFeed(hashtag) {
        try {
            const feed = await ig.feed.tag(hashtag);
            return Promise.resolve(feed);
        } catch (err) {
            return Promise.reject(err.message);
        }
    }

    async comment(mid, msg) {
        let response = {
            isCommentSuccess: undefined,
            isSpamError: undefined,
            errMsg: undefined,
        }
        try {
            await ig.media.comment({ mediaId: mid, text: msg });
            response.isCommentSuccess = true;
            return response;
        } catch (err) {
            err = err + " "
            fs.appendFileSync(`${this.filePath}errors/commentError.txt`, `Date[${new Date().getDate()}] -> OnTime[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] -> ID[${this.username}] ==> ${err}\n\n`)
            response.isCommentSuccess = false;
            response.errMsg = err

            if (err.includes("IgActionSpamError")) {
                response.isSpamError = true;
            }

            return response;
        }
    }

}

const print = (msg, type, line) => {
    !type && console.log(msg);
    type == "ok" && console.log(chalk`{green ${line ? "\n" : ""}⊙ ${msg}}`);
    type == "wait" && console.log(chalk`{bold.cyan ${line ? "\n" : ""}∞ ${msg}}`);
    type == "warn" && console.log(chalk`{yellow ${line ? "\n" : ""}≉ ${msg}}`);
    type == "err" && console.log(chalk`{red ${line ? "\n" : ""}⋈ ${msg}}`);
};

const delay = async (ms) => {
    print(`${chalk.bold.yellow(`#SLEEPING-for-${ms / 1000}s---------------->`)}`);
    return new Promise((resolve) => setTimeout(resolve, ms));
};
module.exports = { instagram };

