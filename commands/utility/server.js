const discord = require("discord.js");

module.exports = {
  name: "server-stats",
  aliases: ["server", "ss"],
  category: "Utility",
  async execute(message, args) {
    message.delete();
    const guild = message.guild;
    const name = guild.name;
    const id = guild.id;
    const memberCount = guild.memberCount;
    const owner = guild.owner;
    const t = guild.channels.cache.filter((s) => s.type === "text").size;
    const v = guild.channels.cache.filter((v) => v.type === "voice").size;
    const feature = guild.features;
    const afk = guild.afkChannel;
    const afkTime = guild.afkTimeout;
    const verif = guild.verificationLevel;
    const roleSiz = guild.roles.cache.size;
    const role = guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((r) => r)
      .slice(0, -1)
      .join(", ");
    const create = moment(guild.createdAt).format(
      "dddd, MMMM Do YYYY, HH:mm:ss"
    );
    const region = guild.region;
    const embed = new discord.MessageEmbed()
      .setAuthor(`${name} Stats`, guild.iconURL())
      .setColor("RANDOM")
      .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
      .addField("ID Guild:", id, false)
      .addField("Create At:", create, false)
      .addField("Region:", region, false)
      .addField("Owner:", owner, false)
      .addField("Owner ID:", owner.id, true)
      .addField("Features", feature, false)
      .addField("Member Count:", memberCount, false)
      .addField("Channel Count:", `Voice: ${v} | Text: ${t}`, true)
      .addField("Afk Channel:", afk, false)
      .addField("Afk Time:", afkTime, true)
      .addField("Verification Level:", verif, false)
      .addField("Role Count:", `(${roleSiz}) ${role}`, false)
      .setFooter(`I will delete this message..`);
    message.channel
      .send(embed)
      .then((message) => message.delete({ timeout: 60000 }));
  },
};
