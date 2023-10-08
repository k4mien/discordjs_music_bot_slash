const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Displays the current songs in the music queue"),
  async execute(interaction) {
    const queue = await distube.getQueue(interaction);
    if (!queue) return interaction.reply("There is nothing playing!");
    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "**Now Playing:**" : `${i}.`} [${song.name}](${
            song.url
          }) - \`[${song.formattedDuration}]\`, added by: **${
            song.user.username
          }**\n`
      )
      .join("\n");
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Red")
          .setTitle(`In Queue\n\n`)
          .setDescription(`${q}`),
      ],
    });
  },
};
