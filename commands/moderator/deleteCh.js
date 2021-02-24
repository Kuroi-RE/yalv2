const sendError = require("../../data/error");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "delete-channel",
  aliases: ["delch"],
  usage: "[channel]",
  category: "Moderation",
  description: "delete mentions channel",
  permissions: ["MANAGE_CHANNELS"],
  async execute(message, args) {
    const channelDelete =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.guild.channels.cache.find((c) => c.name === args[0]);

    await channelDelete.delete();
    const channel = channelDelete;
    const embed = new MessageEmbed()
      .setAuthor("Channel Manager", message.guild.iconURL())
      .setColor("RED")
      .setDescription(`Deleted ${channel}[ ${channelDelete.id} ] `)
      .setFooter(`Deleted by ${message.author.username}`);
    message.channel
      .send(embed)
      .then((message) => message.react("✅"))
      .catch((Err) => sendError(Err, message.channel));
  },
};
