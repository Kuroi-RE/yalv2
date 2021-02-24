const { MessageEmbed } = require("discord.js");
const sendError = require("../../data/error");

module.exports = {
  name: "spotify",
  description: "Show the details status [Spotify]",
  async execute(message, args) {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) =>
          ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.author;
    if (
      user.presence.activities[0].type === "LISTENING" &&
      user.presence.activities[0].name === "Spotify" &&
      user.presence.activities[0].assets !== null
    ) {
      let trackIMG = `https://i.scdn.co/image/${user.presence.activities[0].assets.largeImage.slice(
        8
      )}`;
      let trackURL = `https://open.spotify.com/track/${user.presence.activities[0].syncID}`;
      let trackName = user.presence.activities[0].details;
      let trackAuthor = user.presence.activities[0].state;
      let trackAlbum = user.presence.activities[0].assets.largeText;

      const embed = new MessageEmbed()
        .setAuthor(
          "Spotify Track Info",
          "https://cdn.discordapp.com/emojis/653135129870336031.png?v=1"
        )
        .setColor("GREEN")
        .setThumbnail(trackIMG)
        .addField("Song Name", trackName, true)
        .addField("Album", trackAlbum, true)
        .addField("Author", trackAuthor, false)
        .addField("Listen to Track", `${trackURL}`, false)
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL()
        )
        .setTimestamp();

      message.channel.send(embed);
    } else {
      sendError("This user isn't listening to Spotify!", message.channel);
    }
  },
};
