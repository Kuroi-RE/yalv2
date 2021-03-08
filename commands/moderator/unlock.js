const discord = require("discord.js");

module.exports = {
  name: "unlock",
  category: "Moderation",
  description: "UN-Locks a Channel",
  async execute(client, message, args) {
    if (!message.member.hasPermissions("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions");
    }
    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        allow: ["SEND_MESSAGES"],
      },
    ]);
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`ðŸ”’ ${message.channel} has been Locked`)
      .setColor("RANDOM");
    await message.channel.send(embed);
  },
};
