const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Display all songs in the queue"),
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
    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "**Now Playing:**" : `${i}.`} [${song.name}](${
            song.url
          }) - \`[${song.formattedDuration}]\`, added by: **${
            song.user.displayName
          }**\n`
      )
      .join("\n");
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setTitle(`In Queue\n\n`)
          .setDescription(`${q}`),
      ],
    });
  },
};
