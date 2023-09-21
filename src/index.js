const { Client, IntentsBitField } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.prefix = config.prefix;

client.on('ready', (c)=> {
    console.log(`${c.user.tag} is online`)
})

client.login(config.token);