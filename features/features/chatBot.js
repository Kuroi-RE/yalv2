const request = require("request");

module.exports = (client) => {
  client.on("message", async (message) => {
    const guild = client.guilds.cache.get("744885612460507145");
    const channel = guild.channels.cache.get("808629249849163796");
    if (!channel) return;
    if (message.channel === channel) {
      const word = message.content.split(" ").join(" ");
      if (message.author.bot) return;
      request(
        `https://simsumi.herokuapp.com/api?text=${word}&lang=id`,
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var res = JSON.parse(body);
            channel.send(res.res).catch((Error) => message.channel.send(Error));
          }
        }
      );
    }
  });
};
