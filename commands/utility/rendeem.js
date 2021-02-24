const sendError = require("../../data/error");
const H = require("../../data/rewards.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "rendeem",
  description: "rendeem your code in here!",
  execute(message, args) {
    const code = args[0];
    const member = message.member;
    if (isNaN(code)) {
      sendError("Invalid code! [The code isnt number!]", message.channel);
    }
    if (args[0] !== "298899" && "453369" && "678899" && "888900" && "889652") {
      sendError("Invalid code! [You sent the wrong code!]", message.channel);
    }
    if (code === "298899") {
      message.reply("Congratulations! You already claim the Rewards.");
      member.roles.add(H[298899]);
    } else if (code === "453369") {
      message.reply("Congratulations! You already claim the Rewards.");
      member.roles.add(H[453369]);
    } else if (code === "678899") {
      message.reply("Congratulations! You already claim the Rewards.");
      member.roles.add(H[678899]);
    } else if (code === "888900") {
      message.reply("Congratulations! You already claim the Rewards.");
      member.roles.add(H[888900]);
    } else if (code === "889652") {
      message.reply("Congratulations! You already claim the Rewards.");
      member.roles.add(H[889652]);
    }
  },
};
