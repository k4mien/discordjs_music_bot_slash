const { SlashCommandBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loops the current song")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("on | off")
        .setRequired(true)
        .addChoices({ name: "on", value: "1" }, { name: "off", value: "0" })
    ),
  async execute(interaction) {
    const userInput = interaction.options.getString("mode");
    const queue = await distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "There is nothing in the queue right now!",
        ephemeral: true,
      });

    let mode = Number(userInput);
    queue.setRepeatMode(mode);
    return interaction.reply(
      mode == "0"
        ? `The player is no longer on repeat.`
        : `The player will now repeat the current track.`
    );
  },
};