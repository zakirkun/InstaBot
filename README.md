# INSTABOT - Auto Comments On Hashtags

Instabot Auto Comment on Hashtag is a simple Instagram bot that automatically comments on posts with a specific hashtag. This bot is built using JavaScript and runs on Node.js. With this bot, you can provide your Instagram username and password, specify the hashtag you want to search for, and the comment you want to leave. Once you start the bot, it will search for posts with the specified hashtag and leave the specified comment on them. The bot uses the Instagram API to access the posts and leave comments. The project is available as an open-source on GitHub, so you can modify and customize it as per your needs.

## Disclaimer

The Instabot Auto Comment on Hashtag is an open-source project and is intended for educational purposes only. The developer is not responsible for any misuse of this project, including but not limited to, violating Instagram's terms of service, spamming, or other unethical uses. The use of this bot may result in the suspension or termination of your Instagram account, and the developer is not responsible for any such actions taken by Instagram. It is your responsibility to use this project within the limits of Instagram's terms of service and to respect other Instagram users. By using this project, you agree that the developer is not liable for any damages or losses that may occur as a result of using this bot.

# Installation

## Windows

1: Download and install Node.js from its official website https://nodejs.org/

2: Download InstaBot or clone a GitHub project on your PC, you can use the `git clone URL` command followed by the project's URL.

3: Open the command prompt in the directory where the project is saved, and run the following commands.

```bash
  npm install
  npm install instagram-private-api     #for updates
```

4: For run the Instabot Auto Comment on Hashtag, enter the following command.

```bash
  node bot.js
```

5: After running the Instabot Auto Comment on Hashtag, you can watch the output in the console or open the `status.html` file located in the current folder in your browser.

## Linux

1: Open the terminal and run the following commands.

```bash
  apt update -y
  apt upgrade -y
  apt install nodejs
  git clone https://github.com/cipherwiki/InstaBot.git
  cd InstaBot
  npm install
  npm install instagram-private-api     #for updates
```

2: For run the Instabot Auto Comment on Hashtag, enter the following command.

```bash
  node bot.js
```

3: After running the Instabot Auto Comment on Hashtag, you can watch the output in the console or open the `status.html` file located in the current folder in your browser.

# Android

1: Download and install termux from `https://f-droid.org/en/packages/com.termux/`

Direct download link:- `https://f-droid.org/repo/com.termux_118.apk`

2: Open the termux and run the following commands.

```bash
  termux-setup-storage
  apt update -y
  apt upgrade -y
  apt install nodejs -y
  apt install git -y
  git clone https://github.com/cipherwiki/InstaBot.git
  cd InstaBot
  npm install
  npm install instagram-private-api     #for updates
  cp bot.sh ../bot.sh
```

3: For run the Instabot Auto Comment on Hashtag, enter the following command.

```bash
  bash bot.sh   #if you outside InstaBot directory
  node bot.js   #if you inside InstaBot directory
```

4: After running the Instabot Auto Comment on Hashtag, you can watch the output in the console or open the `status.html` file located in the `insta-bot-config` folder in your file manager to view the status of the bot's activities in your browser.
