const { SlashCommandBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leaves a channel"),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    const botMember = interaction.guild.members.cache.get(
      interaction.client.user.id
    );
    if (botMember.voice?.channelId) {
      const botVoiceChannelId = botMember.voice.channelId;
      if (voiceChannel?.id == botVoiceChannelId) {
        await interaction.reply("Leaving...");
        distube.voices.leave(interaction);
        return interaction.editReply("Disconnected!");
      }
    } else {
      return interaction.reply({
        content: "There is no bot in this channel right now!",
        ephemeral: true,
      });
    }
  },
};
