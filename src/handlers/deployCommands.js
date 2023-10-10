const { REST, Routes } = require("discord.js");
const { clientId, token } = require("../config.json");
const fs = require("fs");
const path = require("path");

async function deployCommands() {
  const commands = [];

  const foldersPath = path.join(__dirname, "..", "commands");
  const commandFiles = fs
    .readdirSync(foldersPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
      console.log("\x1b[36m%s\x1b[0m", "|Loaded|", command.data.name);
    }
  }

  const rest = new REST().setToken(token);

  // rest
  //   .put(Routes.applicationCommands(clientId), { body: [] })
  //   .then(() => console.log("Successfully deleted all guild commands."))
  //   .catch(console.error);

  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(Routes.applicationCommands(clientId), {
        body: commands,
      });

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
}

module.exports = deployCommands;
