const { Client, GatewayIntentBits, Partials, IntentsBitField } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent
	  ]
});

// const client = new Client({
// 	allowedMentions: { parse: ["users", "roles"], repliedUser: true },
// 	partials: [
// 	  Partials.User,
// 	  Partials.Channel,
// 	  Partials.GuildMember,
// 	  Partials.Message,
// 	  Partials.Reaction,
// 	  Partials.GuildScheduledEvent,
// 	  Partials.ThreadMember,
// 	],
// 	intents: new IntentsBitField(131071),
// 	shards: "auto",
//   });

client.prefix = config.prefix;

fs.readdirSync(`./handlers`).forEach((file) => {
	let fileName = file.split(".")[0];
	console.log(`Loading Handler: ${fileName}`);
	require(`./handlers/${file}`)(client);
});

client.on("error", (error) => console.log(error));
client.on("warn", (info) => console.log(info));
process.on("unhandledRejection", (error) => console.log(error));
process.on("uncaughtException", (error) => console.log(error));

client.login(config.token);