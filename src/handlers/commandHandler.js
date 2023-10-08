const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

const handleCommands = (client) => {
  client.commands = new Collection();

  const foldersPath = path.join(__dirname, "..", "commands");

  const commandFiles = fs
    .readdirSync(foldersPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
};

module.exports = handleCommands;
