// module.exports = {
//   name: "loop",
//   inVoiceChannel: true,
//   run: async (client, message, args) => {
//     const queue = client.distube.getQueue(message);
//     if (!queue) return message.channel.send(`There is nothing playing!`);

//     let mode = null;
//     switch (args[0]) {
//       case "off":
//         mode = 0;
//         break;
//       case "on":
//         mode = 1;
//         break;
//     }
//     if (mode != null) {
//       mode = queue.setRepeatMode(mode);
//       message.channel.send(
//         mode == "0"
//           ? `The player is no longer on repeat.`
//           : `The player will now repeat the current track.`
//       );
//     }
//   },
// };
