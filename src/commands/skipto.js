const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skips the current song to")
    .addStringOption((option) =>
      option
        .setName("position")
        .setDescription("Song position in the queue")
        .setRequired(true)
    ),
  async execute(interaction) {
    const queue = await distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "There is nothing in the queue right now!",
        ephemeral: true,
      });
    const position = Number(interaction.options.getString("position"));
    if (isNaN(position)) {
      return interaction.reply({
        content: "Please enter a valid number!",
        ephemeral: true,
      });
    } else if (!(position > 0 && position <= queue.songs.length - 1)) {
      return interaction.reply("There is no song at this position");
    } else if (queue.songs.length == 1) {
      await queue.stop();
      return interaction.reply("Skipped!");
    } else {
      await queue.jump(position);
      return interaction.reply("Skipped!");
    }
  },
};
