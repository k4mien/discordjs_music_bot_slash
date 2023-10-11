const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`${client.user.tag} is ready to play music.`);
    client.user.setActivity("your-message", { type: ActivityType.Custom });
  },
};
