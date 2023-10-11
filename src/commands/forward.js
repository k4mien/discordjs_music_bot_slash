const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forward")
    .setDescription("Forward the current song")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("How many seconds?")
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
    const time = Number(interaction.options.getString("time"));
    if (isNaN(time) || time <= 0)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Please enter a valid number!"),
        ],
        ephemeral: true,
      });
    await queue.seek(queue.currentTime + time);
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setDescription(`Forwarded the song for ${time} seconds!`),
      ],
    });
  },
};
