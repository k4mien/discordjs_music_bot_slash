const { SlashCommandBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current song"),
  async execute(interaction) {
    const queue = await distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "There is nothing in the queue right now!",
        ephemeral: true,
      });
    if (queue.paused) {
      return interaction.reply({
        content: "The current song is already paused",
        ephemeral: true,
      });
    }
    queue.pause();
    return interaction.reply("Paused the song for you :)");
  },
};
