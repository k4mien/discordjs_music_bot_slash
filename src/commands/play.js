const { SlashCommandBuilder } = require("discord.js");
const { distube } = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Search the song (type a name or provide URL)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    const query = interaction.options.getString("query");

    const botMember = interaction.guild.members.cache.get(
      interaction.client.user.id
    );
    if (botMember.voice?.channelId) {
      const botVoiceChannelId = botMember.voice.channelId;
      if (voiceChannel?.id !== botVoiceChannelId) {
        return interaction.reply({
          content:
            "You need to be in the same voice channel as the bot to use this command!",
          ephemeral: true,
        });
      }
    }

    if (!voiceChannel) {
      return interaction.reply({
        content: "Please join a voice channel first!",
        ephemeral: true,
      });
    }

    await interaction.reply("test");

    try {
      await distube.play(voiceChannel, query, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
