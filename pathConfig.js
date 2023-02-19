let pathConfig = async (filePath) => {
    const fs = require('fs');

    // cheack insta-bot-config directory is exist or not
    if (filePath.includes(`/storage/emulated/0/`)) {
        try {
            const stat = fs.statSync(`${filePath}`);
        } catch (error) {
            // create directory
            try {
                fs.mkdirSync(`${filePath}`);
            } catch (error) {

            }
        }
    }

    // cheack errors directory is exist or not
    try {
        const stat = fs.statSync(`${filePath}errors`);
    } catch (error) {
        // create directory 
        try {
            fs.mkdirSync(`${filePath}errors`);
        } catch (error) {

        }
    }

    // cheack sessions directory is exist or not
    try {
        const stat = fs.statSync(`${filePath}sessions`);
    } catch (error) {
        // create directory
        try {
            fs.mkdirSync(`${filePath}sessions`);
        } catch (error) {

        }
    }
}

module.exports = { pathConfig };