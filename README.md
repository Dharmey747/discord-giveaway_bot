# discord-giveaway_bot
 A Discord bot that uses components to create simple giveaways.

# Requirements
 Node 14+ is required to run this script. You can download it [here.](https://nodejs.org/en/)

# Installation
 to install the correct dependencies that are needed for this discord bot to run, please execute the `npm install` command
 and NPM will take care of everything.
 Since components are not yet available in the "production" version of discord.js (the one you get when you do npm install discord.js), this script uses the custom version from [This repository.](https://github.com/monbrey/discord.js#message-components). You will need to have Git installed on your machine to correctly install this repository as a dependency.

# Usage
 To connect your discord bot to the script, go in the `main.js` file, and put your token in the `client.login()` function.
 If you have done everything correctly, you will see a ready message pop up in the console. If you see this, great! Everything is working as intended. You can now type the command `!giveaway` followed by the prize you want to giveaway.