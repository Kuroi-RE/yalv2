const moment = require("moment");
const discord = require("discord.js");

module.exports = {
  name: "user-info",
  usage: "<user>",
  category: "Utility",
  description: "Show user info",
  cooldown: 7,
  async execute(message, args) {
    message.channel.startTyping();
    const trimArray = (arr, maxLen = 10) => {
      if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(` And ${len} more roles...`);
      }
      return arr;
    };
    const BADGES = {
      DISCORD_EMPLOYEE: "<:B_DiscordStaff:724998896975216741>",
      DISCORD_PARTNER: "<:B_DiscordPartner:785508307451772959>",
      BUGHUNTER_LEVEL_1: "<:B_BugHunter:785509602112045156>",
      HYPESQUAD_EVENTS: "<:B_HypesquadEvents:785509602359509053>",
      HOUSE_BRAVERY: "<:B_Bravery:785509029794414624>",
      HOUSE_BRILLIANCE: "<:B_Brilliance:785509030134677545>",
      HOUSE_BALANCE: "<:B_Balance:785509029732417576>",
      EARLY_SUPPORTER: "<:B_Supporter:785509602925346816>",
      VERIFIED_BOT: "<:B_BotTag:785508306303189034>",
      VERIFIED_DEVELOPER: "<:B_DiscordDev:724998896966959195>",
    };
    const mmbr =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let userFlags;
    if (mmbr.user.flags === null) {
      userFlags = "";
    } else {
      userFlags = mmbr.user.flags.toArray();
    }
    const role = mmbr.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    const roleCount = mmbr.roles.cache.size - 1;
    const joinedServer = moment
      .utc(mmbr.joinedAt)
      .format("dddd, MMMM Do YYYY, HH:mm:ss");
    const joined = moment
      .utc(mmbr.user.createdAt)
      .format("dddd, MMMM Do YYYY, HH:mm:ss");
    const embed = new discord.MessageEmbed()
      .setAuthor(
        `${mmbr.user.username} Info`,
        mmbr.user.displayAvatarURL({ dynamic: true, size: 512 })
      )
      .setColor(mmbr.displayHexColor || "RANDOM")
      .setFooter(`Replying ${message.author.username}`)
      .addField("User ID", mmbr.user.id, false)
      .addField(
        "Badge",
        userFlags.length
          ? userFlags.map((flag) => BADGES[flag]).join(", ")
          : "No Badge",
        false
      )
      .addField("Joined Server", joinedServer, false)
      .addField("Account Create", joined, false)
      .addField(
        "Roles",
        `(${roleCount}) ${
          role.length < 10
            ? role.join(", ")
            : role.length > 10
            ? trimArray(role)
            : "No Roles"
        }`,
        false
      );
    await message.channel.send(embed);
    message.channel.stopTyping(true);
  },
};
