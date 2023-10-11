const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const distube = require("../distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song or playlist")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Search the song [ URL | songname | playlist ]")
        .setRequired(true)
    ),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    const queue = await distube.getQueue(interaction);
    const query = interaction.options.getString("query");

    const botMember = interaction.guild.members.cache.get(
      interaction.client.user.id
    );
    if (botMember.voice?.channelId) {
      const botVoiceChannelId = botMember.voice.channelId;
      if (voiceChannel?.id !== botVoiceChannelId) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Blue")
              .setDescription(
                "You need to be in the same voice channel as the bot to use this command!"
              ),
          ],
          ephemeral: true,
        });
      }
    }

    if (!voiceChannel) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("You have to be in a voice channel!"),
        ],
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    try {
      await distube.play(voiceChannel, query, {
        member: interaction.member,
        textChannel: interaction.channel,
        metadata: {
          i: interaction,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
};
