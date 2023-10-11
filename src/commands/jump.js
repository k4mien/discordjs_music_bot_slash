const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jump")
    .setDescription("Skip to the specified song")
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
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("There is nothing in the queue right now!"),
        ],
        ephemeral: true,
      });
    const position = Number(interaction.options.getString("position"));
    if (isNaN(position)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Please enter a valid number!"),
        ],
        ephemeral: true,
      });
    } else if (!(position > 0 && position <= queue.songs.length - 1)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("There is no song at this position!"),
        ],
        ephemeral: true,
      });
    } else if (queue.songs.length == 1) {
      await queue.stop();
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    } else {
      await queue.jump(position);
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    }
  },
};
