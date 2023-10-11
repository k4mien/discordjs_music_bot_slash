const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear the queue"),
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
    await queue.stop();
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setDescription("Cleared all songs in the queue!"),
      ],
    });
  },
};
