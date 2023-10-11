const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),
  async execute(interaction) {
    const queue = await distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("There is nothing in the queue right now!"),
        ],
        ephemeral: true,
      });
    if (queue.songs.length == 1) {
      await queue.stop();
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    } else {
      await queue.skip();
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    }
  },
};
