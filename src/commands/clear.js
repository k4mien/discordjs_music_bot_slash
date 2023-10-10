const { SlashCommandBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the queue"),
  async execute(interaction) {
    const queue = await distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "There is nothing in the queue right now!",
        ephemeral: true,
      });
    await queue.stop();
    return interaction.reply("Cleared all songs in the queue!");
  },
};
