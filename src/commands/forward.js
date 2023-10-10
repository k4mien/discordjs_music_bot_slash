const { SlashCommandBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forward")
    .setDescription("Forwards teh song by x seconds")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("How many seconds would you like to skip?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const queue = await distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "There is nothing in the queue right now!",
        ephemeral: true,
      });
    const time = Number(interaction.options.getString("time"));
    if (isNaN(time) || time <= 0)
      return interaction.reply({
        content: "Please enter a valid number!",
        ephemeral: true,
      });
    await queue.seek(queue.currentTime + time);
    return interaction.reply(`Forwarded the song for ${time} seconds!`);
  },
};
