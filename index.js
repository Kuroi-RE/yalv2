const { prefix, token, owner } = require("./data/config.json");
const discord = require("discord.js"); //! calling discord
const loadFeature = require("./features/load-features"); //! Feature
const client = new discord.Client({ disableMentions: "everyone" }); //! Load discord client
const level = require("./util/level"); // message count
const moment = require("moment");
const handler = require("./handlercmd");
const { ShardingManager } = require("discord.js");

client.on("ready", () => {
  console.log("All module was online!");
  client.user.setStatus("idle");
  const guildHome = client.guilds.cache.get("744885612460507145");
  const activity = [
    `${guildHome.memberCount} Members | ${guildHome.channels.cache.size} Channels | ${guildHome.roles.cache.size} Roles`,
    "V2.0.6",
    "I'm Online!",
    ".help list of commands.",
  ];
  setInterval(() => {
    let rndmAct = activity[Math.floor(Math.random() * activity.length)];
    client.user.setActivity(rndmAct, {
      type: "LISTENING",
    });
  }, 12000);
  console.log(`${client.user.username} was login!`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  const ms = require("ms");
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd === "sleep") {
    await message.reply("I will back! Byeee");
    console.log(`Logout!`);
    process.exit();
  }
});

client.on("guildMemberAdd", async (member) => {
  const guild = client.guilds.cache.get("744885612460507145");
  const stafChannel = guild.channels.cache.get("744918429412098108");
  const embed = new discord.MessageEmbed()
    .setAuthor("Member Guild Add", member.guild.iconURL())
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .addField("Member:", member)
    .addField("Member ID:", member.id)
    .addField(
      "Joined:",
      moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")
    );
  stafChannel.send(embed);
});
//! make client
handler(client);
loadFeature(client);
level(client);

client.setMaxListeners(0);
client.login(token);

//! Tebak apa itu apa, kalau bener dikasih rewards
// let { apa } = require("./data/config.json");
// console.log(`Hey kamu, kamu pernah gak sih ${apa}?`);
