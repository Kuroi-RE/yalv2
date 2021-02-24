const fs = require("fs");
const db = JSON.parse(fs.readFileSync("./data/level.json", "utf8"));
const moment = require("moment");
const { prefix } = require("../data/config.json");
const discord = require("discord.js");

module.exports = (client) => {
  client.on("message", async (message) => {
    const guild = client.guilds.cache.get("744885612460507145");
    const channel = guild.channels.cache.get("744887525918900326");
    if (message.author.bot) return;
    if (!channel) return;
    if (message.channel === channel) {
      if (!db[message.author.id])
        db[message.author.id] = {
          msg: 0,
        };
      db[message.author.id].msg++;
      var userInfo = db[message.author.id];
      if (userInfo.msg > 1500) {
        userInfo.msg = 0;
        const embed = new discord.MessageEmbed()
          .setAuthor("Rewards Contribution", message.author.displayAvatarURL())
          .setColor("GREEN")
          .setDescription(
            `Hey ${message.author.username}, You already contribution for this server with total 1500 messages!\nChoose one of the codes below to get a ROLE!\ncode1 | code2 | code3 | code4 | code5\n\nHow to rendeem:\n.rendeem [code]`
          )
          .setFooter("You can only redeem the code once.");
        message.reply(
          "Congratulations! You have contributed with the chat a total of 1500 messages! Check your dm to claim the rewards!"
        );
        message.author.send(embed);
      }

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (cmd === "messages") {
        const embed = new discord.MessageEmbed()
          .setAuthor(
            `${message.author.username}`,
            message.author.displayAvatarURL()
          )
          .setColor("RANDOM")
          .setDescription(`You already have ${userInfo.msg} messages.`);
        message.channel
          .send(embed)
          .then((message) => message.delete({ timeout: 120000 }));
      }
      fs.writeFile("./data/level.json", JSON.stringify(db), (x) => {
        if (x) console.error(x);
      });
    }
  });
};
