const sendError = require("../../data/error");
const { owner } = require("../../data/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  usage: "[code]",
  category: "Onwer Only",
  async execute(message, args) {
    if (message.author.id !== owner) {
      sendError("Only owner can Eval!", message.channel);
    }
    try {
      var client = message.client;
      var result = eval(args.join(" "));
      var epal = new MessageEmbed()
        .setAuthor("Eval Commands", client.user.displayAvatarURL())
        .setTimestamp()
        .addField("Content", `\`\`\`${args.join(" ")}\`\`\``, false)
        .addField("Evaled Result", `\`\`\`${result}\`\`\``, false);
      message.channel.send(epal).catch((E) => sendError(E, message.channel));
    } catch (e) {
      const epalErr = new MessageEmbed()
        .setAuthor("Eval Commands", client.user.displayAvatarURL())
        .setTimestamp()
        .addField("Content", `\`\`\`${args.join(" ")}\`\`\``, false)
        .addField("Evaled Result", `\`\`\`${e}\`\`\``, false);
      message.channel.send(epalErr);
    }
  },
};
