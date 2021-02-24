const sendError = require("../../data/error");
const { owner } = require("../../data/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "setStatus",
  aliases: ["setPresence"],
  description: "change the bot status",
  usage: "[dnd | online | invisible | idle]",
  async execute(message, args) {
    if (message.author.id !== owner) {
      sendError("Only owner can use this commands!", message.channel);
    }
    const newS = args[0];
    if (!newS)
      sendError("Invalid syntax! [Where the status?]", message.channel);
    const client = message.client;
    if (args[0] !== "dnd" && "online" && "invisible" && "idle") {
      sendError("Invalid Status name!", message.channel);
    }
    if (newS === "dnd") {
      message.react("<:ram_dnd:798001177529942026>");
      client.setStatus("dnd");
    }
    if (newS === "online") {
      message.react("<:ram_online:798001206936993795>");
      client.setStatus("online");
    }
    if (newS === "invisible") {
      message.react("<:offline:794918750360436757>");
      client.setStatus("invisible");
    }
    if (newS === "idle") {
      message.react("<:ram_idle:798001140146503680>");
      client.setStatus("idle");
    }
  },
};
