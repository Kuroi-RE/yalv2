const sendError = require("../../data/error");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["icon", "pfp"],
  usage: "[user]",
  cooldown: 5,
  category: "Utility",
  description: "Show Avatar current user!",
  async execute(message, args) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) =>
          ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );
    if (!user) {
      const embed = new MessageEmbed()
        .setAuthor("Here your Avatar!")
        .setImage(
          message.author.displayAvatarURL({ dynamic: true, size: 1024 })
        )
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send(embed);
    } else {
      const emb = new MessageEmbed()
        .setAuthor(`${user.user.username} Avatar`)
        .setImage(user.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send(emb);
    }
  },
};
