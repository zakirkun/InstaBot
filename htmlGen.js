let htmlGen = async (basicDetails, idStatus, commentStatus, path, chalk, print) => {
    const FS = require("fs");
    let htmlTemp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InstaBot-Status</title> 
    <style>
        body{
            margin:25px;
        }
        .styled-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            width: 100%;
        }
        .styled-table thead tr {
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }
        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }
        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }
        th ,td{
            border: 1px solid black;
            vertical-align: center;
            text-align: center;
        }


    </style>
</head>
<body>
    <!-- basicDetails -->
    <table class="styled-table">
        <thead>
            <tr>
                <th>Hashtag</th>
                <th>maxComment</th>
                <th>maxFailed</th>
                <th>CommentSleep</th>
                <th>RefreshTagAP</th>
                <th>IdsPtr</th>
                <th>TagConditions</th>
            </tr>
        </thead>
        <tbody>
            <!-- $DETAILS1$ -->
        </tbody>
    </table>

    <!-- idStatus -->
    <table class="styled-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Status</th>
                <th>StartTime</th>
                <th>EndTime</th>
                <th>Success</th>
                <th>Failed</th>
            </tr>
        </thead>
        <tbody>
            <!-- $DETAILS2$ -->
        </tbody>
    </table>

    <!-- commentStatus -->
    <table class="styled-table">
        <thead>
            <tr>
                <th>targetId</th>
                <th>status</th>
                <th>textComment</th>
                <th>onTime</th>
            </tr>
        </thead>
        <tbody>
            <!-- $DETAILS3$ -->
        </tbody>
    </table>



    <script>
        setInterval(()=>{
            location.reload()
        },5000)
    </script>
</body>
</html>`

    let textMsg
    if (commentStatus.length <= 0) {
        textMsg = "Initialization"
    } else {
        textMsg = commentStatus[commentStatus.length - 1].textComment
    }


    for (i of basicDetails) {
        let code = `
            <tr>
                <td>${i.hashtag}</td>
                <td>${i.maxComment}</td>
                <td>${i.maxFailed}</td>
                <td>${i.CommentSleep}</td>
                <td>${i.RefreshTagAP}</td>
                <td>${i.IdsPtr}</td>
                <td>${i.TagConditions}</td>
            </tr>
            <!-- $DETAILS1$ -->
`
        htmlTemp = htmlTemp.replace(`<!-- $DETAILS1$ -->`, code)

        console.log(`
${chalk.bold.blue("*********************** BASIC-DETAIL ***********************")}

${chalk.bold.yellow(`maxComment ---[${chalk.bold.white(i.maxComment)}]`)}             ${chalk.bold.yellow(`RefreshTagAP --[${chalk.bold.white(i.RefreshTagAP)}]`)}
${chalk.bold.yellow(`maxFailed ----[${chalk.bold.white(i.maxFailed)}]`)}              ${chalk.bold.yellow(`IdsPtr --------[${chalk.bold.white(i.IdsPtr)}]`)}
${chalk.bold.yellow(`CommentSleep -[${chalk.bold.white(i.CommentSleep)}]`)}              ${chalk.bold.yellow(`TagConditions -[${chalk.bold.white(i.TagConditions)}]`)}
${chalk.bold.yellow(`Hashtag ------[${chalk.bold.white(i.hashtag)}]`)}
${chalk.bold.yellow(`LastComment(${chalk.bold.green(textMsg)})`)}
    `)
    }

    console.log(chalk.bold.blue("************************ IDS-STATUS ************************\n"))
    for (i of idStatus) {
        let code = `
            <tr>
                <td>${i.ID}</td>
                <td>${i.Status}</td>
                <td>${i.StartTime}</td>
                <td>${i.EndTime}</td>
                <td>${i.Success}</td>
                <td>${i.Failed}</td>
            </tr>
            <!-- $DETAILS2$ -->
`
        htmlTemp = htmlTemp.replace(`<!-- $DETAILS2$ -->`, code)

        console.log(`${chalk.bold.yellow(`⊙ ---[${chalk.bold.cyan(i.ID)}] [${chalk.bold.white(i.Status)}]=>
     Success[${chalk.bold.green(i.Success)}]  Failed[${chalk.bold.red(i.Failed)}]  OnTime[${chalk.bold.white(i.StartTime)} TO ${chalk.bold.white(i.EndTime)}]`)}`)
    }

    console.log(chalk.bold.blue("\n********************** COMMENT-STATUS **********************\n"))
    for (i of commentStatus) {
        let code = `
            <tr>
                <td>${i.targetId}</td>
                <td>${i.status}</td>
                <td>${i.textComment}</td>
                <td>${i.onTime}</td>
            </tr>
            <!-- $DETAILS3$ -->
`
        htmlTemp = htmlTemp.replace(`<!-- $DETAILS3$ -->`, code)
        console.log(`${chalk.bold.yellow(`Status[${i.status ? chalk.bold.green(i.status) : chalk.bold.red(i.status)}] Time[${chalk.bold.white(i.onTime)}] =>[${chalk.bold.white(i.targetId)}]`)}`)

    }
    console.log(chalk.bold.blue("\n************************************************************\n"))


    FS.writeFileSync(`${path}status.html`, htmlTemp)
}

module.exports = { htmlGen };


