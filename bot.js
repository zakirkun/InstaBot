const chalk = require("chalk");
const fs = require("fs");

let filePath //change according your requirements but end with `/` is required

if (true) {
    const os = require('os');
    const platform = os.platform();

    if (platform === 'android') {
        filePath = `/storage/emulated/0/insta-bot-config/`      //for android
    } else {
        filePath = `./`     //for windows or linux
    }
}


let idStatus = []
let basicDetails = []
let commentStatus = []
let tagPtr = 0

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
let printStatus = async () => {
    console.clear()
    if (commentStatus.length > 7) {
        commentStatus.shift()
    }

    //The following code will print the output as table in the console

    // console.table(basicDetails)
    // console.table(idStatus)
    // console.table(commentStatus)

    const { htmlGen } = require("./htmlGen.js");
    await htmlGen(basicDetails, idStatus, commentStatus, filePath, chalk, print)
}

let runner = async (config) => {
    printStatus()
    for (let id = 0; id < config.username.length; id++) {
        idStatus[id].Status = 'In Progress'
        idStatus[id].StartTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        let idPtr = 0;

        try {
            printStatus()

            const { instagram } = require("./index.js");
            const ig = new instagram(config.username[id], config.password[id], filePath);
            print(`${chalk.bold.green(`#Try to Login . . . . . .`)}`);
            const login = await ig.login();

            let items
            for (let i = 0; i < config.maxComment; i++) {
                printStatus()

                // get id data from hashtag and refresh it 
                if (i % config.refreshTagAfterPost == 0) {
                    tagPtr++
                    tagPtr = tagPtr % config.hashtag.length
                    basicDetails[0].hashtag = config.hashtag[tagPtr]

                    print(`${chalk.bold.yellow(`#Collecting users in tagged media . . .`)}`);
                    idPtr = 0;
                    try {
                        print(`${chalk.bold.green(`    @TRY FIRST . . . .`)}`);
                        basicDetails[0].TagConditions = "Excellent"
                        const tags = await ig.tagFeed(basicDetails[0].hashtag);
                        items = await tags.items();
                    } catch (error) {
                        await delay(4000)
                        fs.appendFileSync(`${filePath}errors/TagError.txt`, `Date[${new Date().getDate()}] -> OnTime[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] -> ID[${config.username[id]}] ==> ${error}\n\n`)
                        try {
                            print(`${chalk.bold.green(`    @TRY SECOND . . . .`)}`);
                            basicDetails[0].TagConditions = "Good"
                            const tags = await ig.tagFeed(basicDetails[0].hashtag);
                            items = await tags.items();
                        } catch (error) {
                            await delay(4000)
                            try {
                                print(`${chalk.bold.red(`    @TRY LAST . . . .`)}`);
                                basicDetails[0].TagConditions = "Fair"
                                const tags = await ig.tagFeed(basicDetails[0].hashtag);
                                items = await tags.items();
                            } catch (error) {
                                await delay(4000)
                                basicDetails[0].TagConditions = "Error"
                                console.log(error)
                            }
                        }
                    }

                }

                let userMedia
                let chance = 0
                while (chance++ < 50) {
                    try {
                        userMedia = await ig.mediaInfo(items[idPtr].pk)
                        if (userMedia.items[0].commenting_disabled_for_viewer || items[idPtr].commenting_disabled_for_viewer) {
                            idPtr++
                        } else {
                            break;
                        }
                    } catch (error) {
                        idPtr++
                        fs.appendFileSync(`${filePath}errors/MediaError.txt`, `Date[${new Date().getDate()}] -> OnTime[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] -> ID[${config.username[id]}] ==> ${error}\n\n`)
                    }
                }

                basicDetails[0].IdsPtr = idPtr + 1

                const task = [ig.comment(items[idPtr].pk, config.comment[i % config.comment.length])];
                let [comment] = await Promise.all(task);

                comment.isCommentSuccess ? idStatus[id].Success++ : idStatus[id].Failed++;

                commentStatus.push({
                    targetId: items[idPtr++].user.username,
                    status: comment.isCommentSuccess,
                    textComment: config.comment[i % config.comment.length],
                    onTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                })

                printStatus()
                await delay(config.CommentSleep * 1000);
                if (idStatus[id].Failed >= config.maxFailed || comment.isSpamError) {
                    break
                }
            }

            printStatus()
        } catch (err) {
            err = err + " "
            if (err.includes(`password you entered is incorrect`)) {
                idStatus[id].Status = 'Wrong Password';
            } else if (err.includes(`check your username`)) {
                idStatus[id].Status = 'Wrong Username';
            } else if (err.includes(`challenge_required`)) {
                idStatus[id].Status = 'challenge_required';
            } else {
                idStatus[id].Status = 'Other Error';
            }
            idStatus[id].EndTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            fs.appendFileSync(`${filePath}errors/IdsError.txt`, `Date[${new Date().getDate()}] -> OnTime[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] -> ID[${config.username[id]}] ==> ${err}\n\n`)

        }
        if (idStatus[id].Status == 'In Progress') {
            idStatus[id].Status = 'Done';
            idStatus[id].EndTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        }
        if (id >= 2) {
            if (idStatus[id].Status != "Done" && idStatus[id - 1].Status != "Done" && idStatus[id - 2].Status != "Done") {
                for (let idTemp = id + 1; idTemp < config.username.length; idTemp++) {
                    idStatus[idTemp].Status = 'Skipped';
                }
                break
            }
        }
        await delay(5000)
    }
    printStatus()
};


// input from file and some basic checks
(async () => {
    const { pathConfig } = require("./pathConfig.js");
    await pathConfig(filePath)

    const { botIntro } = require("./intro.js");
    await botIntro()

    console.clear()
    const { setupConfig } = require("./setupConfig.js");
    await setupConfig(filePath)

    let config
    try {
        config = JSON.parse(fs.readFileSync(`${filePath}config.json`, 'utf-8'))
    } catch (err) {
        console.log(chalk.bold.red("WARNING: Please configure the config.json file."))
        return
    }

    for (i of config.username) {
        idStatus.push({ 'ID': i, 'Status': 'pending', "StartTime": '-', 'EndTime': '-', "Success": 0, "Failed": 0 })
    }
    basicDetails = [{
        "hashtag": "Initialization",
        "maxComment": config.maxComment,
        "maxFailed": config.maxFailed,
        "CommentSleep": config.CommentSleep,
        "RefreshTagAP": config.refreshTagAfterPost,
        "IdsPtr": 0,
        "TagConditions": 'process',
    }]

    await runner(config)

})()
