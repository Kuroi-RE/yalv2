const cron = require("cron");
const { owner } = require("../../data/config.json");
module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    var home = client.users.cache.get(owner);
    var guild = client.guilds.cache.get("744885612460507145");
    var channel = guild.channels.cache.get("744887525918900326");
    let PagiMessage = new cron.CronJob("00 15 09 * * *", () => {
      home.send("Selamat pagi!");
    });

    let MalamMessage = new cron.CronJob("00 30 20 * * *", () => {
      home.send("Selamat Malam!");
    });

    PagiMessage.start();
    MalamMessage.start();
  });
};
