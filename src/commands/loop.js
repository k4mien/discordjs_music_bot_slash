const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

mode = 0;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loop current song")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("on | off")
        .setRequired(false)
        .addChoices({ name: "on", value: "1" }, { name: "off", value: "0" })
    ),
  async execute(interaction) {
    const userInput = interaction.options.getString("mode");
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

    if (userInput) {
      mode = Number(userInput);
      queue.setRepeatMode(mode);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription(
              mode == "0"
                ? `The player is no longer on repeat.`
                : `The player will now repeat the current track.`
            ),
        ],
      });
    } else {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription(
              "The current loop mode is: " + (mode == "0" ? "off" : "on")
            ),
        ],
      });
    }
  },
};
