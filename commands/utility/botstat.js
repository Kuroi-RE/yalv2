const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stats",
  aliases: ["bot", "info"],
  cooldown: 10,
  category: "Utility",
  description: "Show bot stats",
  async execute(message, args) {
    const client = message.client;
    const presence = client.user.presence.activities[0].type
      ? client.user.presence.activities[0].type
      : "None";
    const presenceName = client.user.presence.activities[0].name
      ? client.user.presence.activities[0].name
      : "None";
    const ramTotal = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
      2
    )}MB of 500MB RAM`;
    const ping = client.ws.ping;
    const cmd = [10];
    const cmdTotal = cmd ? cmd : "Unspecified";
    const embed = new MessageEmbed()
      .setAuthor(
        `${client.user.username} Stats`,
        client.user.displayAvatarURL()
      )
      .setColor("BLUE")
      .setTimestamp()
      .addField("Name", client.user.username, true)
      .addField("Discriminator", client.user.discriminator, true)
      .addField("IDs", client.user.id, true)
      .addField("Status", client.user.presence.status, true)
      .addField("Presence", presenceName, true)
      .addField("Type Presence", presence, true)
      .addField("Commands Count", cmdTotal, true)
      .addField("Storage", ramTotal, true)
      .addField("API Latency", `${ping}ms`, true)
      .addField(
        "Uptime",
        Math.round(client.uptime / (1000 * 60 * 60)) +
          " hours, " +
          (Math.round(client.uptime / (1000 * 60)) % 60) +
          " minutes, and " +
          (Math.round(client.uptime / 1000) % 60) +
          " seconds",
        true
      );
    message.channel.send(embed);
  },
};
