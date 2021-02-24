const sendError = require("../../data/error");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  permissions: ["BAN_MEMBERS"],
  category: "Moderation",
  description: "UNBanning member",
  usage: "[member] <reason>",
  async execute(message, args) {
    const member = args[0];
    const reaso = args.slice(1).join(" ");
    const reason = reaso ? reaso : "Unspecified";
    await message.guild.members.unban(member, reason);
    const user = message.guild.members.cache.get(member);
    const mbed = new MessageEmbed()
      .setAuthor(
        `${user.user.tag} has been Banned!`,
        user.user.displayAvatarURL()
      )
      .setDescription(`Reason: ${reason}`);
    message.channel.send(mbed);
    const logCh = message.guild.channel.cache.get("744913294715781130");
    const embed = new MessageEmbed()
      .setAuthor("Your Another Logs", message.guild.iconURL())
      .setColor("RED")
      .addField("Type", "Ban")
      .addField("Reason", reason)
      .addField("Member", user.user.tag)
      .addField("Moderator", message.author.tag)
      .setTimestamp();
    logCh.send(embed);
  },
};
