const { MessageEmbed } = require("discord.js");
const sendError = require("../../data/error");
const { prefix } = require("../../data/config.json");

module.exports = {
  name: "help",
  aliases: ["module"],
  category: "Help",
  description: "get specified info for commands.",
  async execute(message, args) {
    const data = [];
    const { commands } = message.client;
    const client = message.client;

    if (!args.length) {
      let fun = "say, avatar, ping, kiss, hug, slap";
      let utility =
        "stats, help, rendeem, spotify, status, user-info, server-stats";
      let moderator =
        "ban, cache, delete-channel, kick, mute, user-perm, purge, temporary-mute, unban, unmute, warn";
      let music = "play";
      message.delete({ timeout: 2000 });
      const helped = new MessageEmbed()
        .setAuthor(
          `${client.user.username} Help`,
          client.user.displayAvatarURL()
        )
        .setColor(message.member.displayHexColor || "RANDOM")
        .setTimestamp()
        .setThumbnail(
          client.user.displayAvatarURL({ dynamic: true, size: 512 })
        )
        .setDescription(
          `You can get specified info with \`${prefix}help [module]\`\nI will deleted in 20 seconds`
        )
        .addField("Fun", fun, false)
        .addField("Utility", utility, false)
        .addField("Moderator", moderator, false)
        .addField("Music", music, false)
        .setFooter(`Replying ${message.author.username}`);
      message.channel
        .send(helped)
        .then((message) => message.delete({ timeout: 20000 }));
    }
    if (args.length) {
      const name = args[0].toLowerCase();
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.reply("that's not a valid command!");
      }

      data.push(`**Name:** ${command.name}`);
      if (command.aliases) {
        var alias = command.aliases.join(", ");
      } else {
        alias = "Unspecified";
      }
      if (command.description) {
        var desc = command.description ? command.description : "Unspecified";
      }
      if (command.usage) {
        var usag = `${prefix}${command.name} ${command.usage}`;
      } else {
        usag = "Unspecified";
      }
      if (command.category) {
        var categor = command.category ? command.category : "Unspecified";
      }
      const coolwn = command.cooldown || 3;

      const spec = new MessageEmbed()
        .setAuthor(client.user.username + " Help Center")
        .setThumbnail(
          client.user.displayAvatarURL({ dynamic: true, size: 512 })
        )
        .setColor(message.member.displayHexColor || "RANDOM")
        .addField("Name:", command.name)
        .addField("Aliases:", alias)
        .addField("Category:", categor)
        .addField("Description:", desc)
        .addField("Usage:", usag)
        .addField("Cooldowns:", `${coolwn}second(s)`);
      message.channel.send(spec);
    }
  },
};
