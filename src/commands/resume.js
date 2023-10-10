const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the current song"),
  async execute(interaction) {
    const queue = await distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "There is nothing in the queue right now!",
        ephemeral: true,
      });
    if (queue.paused) {
      queue.resume();
      return interaction.reply("Resumed the song for you :)");
    } else {
      return interaction.reply({
        content: "The queue is not paused!",
        ephemeral: true,
      });
    }
  },
};
