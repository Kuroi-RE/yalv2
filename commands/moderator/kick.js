const sendError = require("../../data/error");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  permissions: ["KICK_MEMBERS"],
  category: "Moderation",
  description: "Kick member",
  usage: "[member] <reason>",
  async execute(message, args) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member) {
      sendError("You must mentions members!", message.channel);
    } else {
      const reaso = args.slice(0).join(" ");
      const reason = reaso ? reaso : "Unspecified";
      await member.kick({ reason: reason });
      const mbed = new MessageEmbed()
        .setAuthor(
          `${member.user.tag} has been kicked`,
          member.user.displayAvatarURL()
        )
        .setDescription(`Reason: ${reason}`);
      message.channel.send(mbed);
      const logCh = message.guild.channel.cache.get("744913294715781130");
      const embed = new MessageEmbed()
        .setAuthor("Your Another Logs", message.guild.iconURL())
        .setColor("RED")
        .addField("Type", "Kick")
        .addField("Reason", reason)
        .addField("Member", member.user.tag)
        .addField("Moderator", message.author.tag)
        .setTimestamp();
      logCh.send(embed);
    }
  },
};
