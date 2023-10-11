const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Removes specific song from the queue")
    .addStringOption((option) =>
      option
        .setName("position")
        .setDescription("Provide the song position you want to delete")
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
    } else {
      await queue.songs.splice(position, 1);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Song removed from the queue!"),
        ],
      });
    }
  },
};
