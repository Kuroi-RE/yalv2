const role = {
  giveaway: "750397476476813362",
  pedofil: "744924147292962916",
  fuckboy: "744924152296898591",
  sadboy: "744923764935884890",
  sadgirl: "744924030359961640",
  notify: "749999044721508392",
  ads: "745227013387976784",
  noads: "768021798427557888",
};
const { MessageEmbed } = require("discord.js");
const sendError = require("../../data/error");

module.exports = {
  name: "im",
  aliases: ["claim", "get"],
  description: "Claim a free role",
  usage: "[namerole]",
  category: "Utility",
  cooldown: 10,
  async execute(message, args) {
    const want = args[0];
    const member = message.member;
    if (message.channel.id !== "755771083575001108") return;
    const emb = new MessageEmbed()
      .setAuthor(member.displayName || message.author.username)
      .setColor(member.displayHexColor || "RANDOM")
      .setThumbnail(
        message.author.displayAvatarURL({ dynamic: true, size: 512 })
      );
    if (!args.length) {
      sendError(
        "Invalid Args! Usage: .im <rolename>\nRole: giveaway, pedofil, fuckboy, sadgirl, sadboy, notify, ads, noads",
        message.channel
      );
    }
    if (want === "giveaway") {
      await member.roles.add(role.giveaway);
      message.channel
        .send(emb.setDescription("Claimed Giveaway Roles!"))
        .then((message) => message.react("✅"));
    }
    if (want === "pedofil") {
      await member.roles.add(role.pedofil);
      message.channel
        .send(emb.setDescription("Claimed Pedofil Roles!"))
        .then((message) => message.react("✅"));
    }
    if (want === "fuckboy") {
      await member.roles.add(role.fuckboy);
      message.channel
        .send(emb.setDescription("Claimed Fuckboy Roles!"))
        .then((message) => message.react("✅"));
    }
    if (want === "sadboy") {
      await member.roles.add(role.sadboy);
      message.channel
        .send(emb.setDescription("Claimed Sadboy Roles!"))
        .then((message) => message.react("✅"));
    }
    if (want === "sadgirl") {
      await member.roles.add(role.sadgirl);
      message.channel
        .send(emb.setDescription("Claimed Sadgirl Roles!"))
        .then((message) => message.react("✅"));
    }
    if (want === "notify") {
      await member.roles.add(role.notify);
      message.channel
        .send(emb.setDescription("Claimed Notify Roles!"))
        .then((message) => message.react("✅"));
    }
    if (want === "ads") {
      await member.roles.add(role.ads);
      message.channel
        .send(emb.setDescription("Claimed ADS Roles!"))
        .then((message) => message.react("✅"));
    }
    if (want === "noads") {
      await member.roles.add(role.noads);
      message.channel
        .send(emb.setDescription("Claimed No Ads Roles!"))
        .then((message) => message.react("✅"));
    }
  },
};
