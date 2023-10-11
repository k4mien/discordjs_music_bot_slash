const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave the channel"),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    const botMember = interaction.guild.members.cache.get(
      interaction.client.user.id
    );
    if (botMember.voice?.channelId) {
      const botVoiceChannelId = botMember.voice.channelId;
      if (voiceChannel?.id == botVoiceChannelId) {
        await interaction.reply({
          embeds: [
            new EmbedBuilder().setColor("Blue").setDescription("Leaving..."),
          ],
        });
        distube.voices.leave(interaction);
        return interaction.editReply({
          embeds: [
            new EmbedBuilder().setColor("Blue").setDescription("Disconnected!"),
          ],
        });
      }
    } else {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("I already leaved this channel!"),
        ],
        ephemeral: true,
      });
    }
  },
};
