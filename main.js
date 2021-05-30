const Discord = require('discord.js');
const client = new Discord.Client({intents: Discord.Intents.NON_PRIVILEGED});

const giveawayCommand = '!giveaway'

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator}!`)
});

client.on('message', message => {
    if (message.content.startsWith("!giveaway")) {
        message.delete();
        message.channel.send(`:tada: Pick a box for a chance to win **${message.content.split(`${giveawayCommand} `)[1]}**!`, {
            components: [
                {type: 1, components: [
                        {type: 2, label: "-", style: 2, custom_id: "ttt11"},
                        {type: 2, label: "-", style: 2, custom_id: "ttt12"},
                        {type: 2, label: "-", style: 2, custom_id: "ttt13"},
                ]},
                {type: 1, components: [
                        {type: 2, label: "-", style: 2, custom_id: "ttt21"},
                        {type: 2, label: "-", style: 2, custom_id: "ttt22"},
                        {type: 2, label: "-", style: 2, custom_id: "ttt23"},
                ]},
                {type: 1, components: [
                        {type: 2, label: "-", style: 2, custom_id: "ttt31"},
                        {type: 2, label: "-", style: 2, custom_id: "ttt32"},
                        {type: 2, label: "-", style: 2, custom_id: "ttt33"},
                ]},
            ]            
        })
    }
});

client.on('interaction', interaction => {
    if (interaction.customID.startsWith("ttt")) {
        playGame(interaction);
    }
});


async function playGame(interaction) {
    const msg = interaction.message;
    const userInteracted = interaction.user.id;
    const giveawayPrize = msg.content.split('Pick a box for a chance to win ')[1]

    const i = parseInt(interaction.customID[3]);
    const x = parseInt(interaction.customID[4]);

    try {
        var pressed = msg.components[i-1].components[x-1]
    } catch {
        return;
    }



    if (pressed.label != "-") {
        return await interaction.deferUpdate();
    }

    result = determineWinner()

    if (result) {
        pressed.label = "🎉"
        pressed.style = 3 //green
    } else {
        pressed.label = "🚫"
        pressed.style = 4 //red
    }

    const components = [];

    for(actionRow of msg.components) {
        components.push({type: 1, components: []});
        for (var button of actionRow.components) {
            if (button.customID == pressed.customID) {
                components[components.length - 1].components.push({type: 2, label: button.label, style: button.style, custom_id: button.customID});
            } else {
                components[components.length - 1].components.push({type: 2, label: "🚫", style: 4, custom_id: button.customID});
            }
        }
    }

    await msg.edit({components: components});
    await interaction.deferUpdate();

    if (result) {
        await msg.edit(`Giveaway has ended. \nWinner: <@${userInteracted}>\nPrize: ${giveawayPrize}`);
        await msg.channel.send(`:tada: <@${userInteracted}> congratulations! You have won ${giveawayPrize} :tada:`);
    } else {
        await msg.edit("A winner could not be determined.");
    }
}

function determineWinner() {
    const winOrLose = [true, false];
    random = Math.floor(Math.random() * winOrLose.length);
    return winOrLose[random];
}



client.login('');