module.exports = async function (client, message) {
  if (message.author.bot || !message.guild) return;
  const prefix = message.client.prefix;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`You must be in a voice channel!`);
  }
  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.error(e);
    message.channel.send(`Error: \`${e}\``);
  }
};