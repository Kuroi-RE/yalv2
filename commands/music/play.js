const ytdl = require("ytdl-core");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "play",
  usage: "[url]",
  guildOnly: true,
  description: "Let bot play a music for you",
  category: "Music",
  async execute(message, args) {
    message.delete();
    const { channel } = message.member.voice;
    if (!channel)
      return message.reply("Kamu tidak berada dalam saluran manapun!");
    channel.join().then(async (connection) => {
      const url = args[0];
      const stream = ytdl(url, { format: "audioonly" });
      const info = await ytdl.getInfo(url);
      const song = {
        title: info.videoDetails.title,
        time: info.videoDetails.lengthSeconds,
        views: info.videoDetails.viewCount,
        author: info.videoDetails.author.name,
      };
      const dispatcher = connection.play(stream);
      await dispatcher;
      const embed = new MessageEmbed()
        .setAuthor("Music Commands")
        .setColor(message.member.displayHexColor | "RANDOM")
        .addField("Author:", song.author, false)
        .addField("Title:", song.title, false)
        .addField("Time:", song.time, false)
        .addField("Views:", song.views, false);
      const b = await message.channel.send(embed);
      dispatcher.on("finish", () => {
        channel.leave();
        b.delete();
      });
    });
  },
};
