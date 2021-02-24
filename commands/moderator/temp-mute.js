const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const sendError = require("../../data/error");
module.exports = {
  name: "temporary-mute",
  aliases: ["temp-mute"],
  category: "Moderation",
  permissions: ["MANAGE_ROLES"],
  description: "Temporary Mute member",
  usage: "[member] [time] <reason>",
  async execute(message, args) {
    const member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    console.log(`${args[0]} ${args[1]}`);
    if (!member) {
      sendError(
        "Invalid syntax [Cannot read member!]\n.temp-mute [member] [time] [reason]",
        message.channel
      );
    }
    const time = args[1];
    if (!time) {
      sendError(
        "Invalid syntax [Cannot read the Time!]\n.temp-mute [member] [time] [reason]",
        message.channel
      );
    }
    if (
      args[1].endsWith("d") &&
      args[1].endsWith("h") &&
      args[1].endsWith("m") &&
      args[1].endsWith("s")
    )
      return sendError(
        "Invalid syntax [Cannot read the time format]\nYou can use d(days), h(hours), m(minutes), s(second)"
      );
    const reaso = args.slice(2).join(" ");
    const reason = reaso ? reaso : "Unspecified";
    if (member.bot) {
      sendError("Invalid Member! [Cannot mute bots]", message.channel);
    }
    const user = message.mentions.users.first();
    const embed = new MessageEmbed()
      .setAuthor(`${user.tag} has been muted for ${time}`)
      .setDescription(`Reason: ${reason}`);
    message.channel.send(embed);
    const logCh = message.guild.channels.cache.get("744913294715781130");
    const embed1 = new MessageEmbed()
      .setAuthor("Your Another Logs", message.guild.iconURL())
      .setColor("RED")
      .addField("Type", "Temporary Mute")
      .addField("Reason", reason)
      .addField("Time", time)
      .addField("Member", user.tag)
      .addField("Moderator", message.author.tag)
      .setTimestamp();
    logCh.send(embed1);
    let mainrole = message.guild.roles.cache.find(
      (role) => role.name === "Another Life"
    );
    let role = message.guild.roles.cache.find((role) => role.name === "Muted");
    member.roles.add(role);
    member.roles.remove(mainrole);
    setTimeout(function () {
      member.roles.remove(role);
      member.roles.add(mainrole);
      const em = new MessageEmbed()
        .setAuthor(`${user.tag} has been unmute`)
        .setDescription(`Reason: ${reason}`);
      logCh.send(em);
    }, ms(args[1]));
  },
};
