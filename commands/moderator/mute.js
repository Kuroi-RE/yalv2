const sendError = require("../../data/error");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  permissions: ["MANAGE_ROLES"],
  category: "Moderation",
  description: "Mute member",
  usage: "[member] <reason>",
  async execute(message, args) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member) {
      sendError(
        "Invalid syntax [Cannot read the Member]\n.mute [member] [reason]"
      );
    }
    const reaso = args.slice(1).join(" ");
    const reason = reaso ? reaso : "Unspecified";
    let mainrole = message.guild.roles.cache.find(
      (role) => role.name === "Another Life"
    );
    let role = message.guild.roles.cache.find((role) => role.name === "Muted");
    member.roles.add(role);
    member.roles.remove(mainrole);
    const user =
      message.mentions.users.first() || message.guild.members.get(args[0]);
    const embed = new MessageEmbed()
      .setAuthor(`${user.tag} has been muted!`, user.displayAvatarURL())
      .setDescription(
        `Reason: ${reason}\n\n\n\`[Unmuted?](https://google.com/)\``
      );
    message.channel.send(embed);
    const logCh = message.guild.channels.cache.get("744913294715781130");
    const embed1 = new MessageEmbed()
      .setAuthor("Your Another Logs", message.guild.iconURL())
      .setColor("RED")
      .addField("Type", "Mute")
      .addField("Reason", reason)
      .addField("Member", user.tag)
      .addField("Moderator", message.author.tag)
      .setTimestamp();
    logCh.send(embed1);
  },
};
