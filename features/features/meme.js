module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    const guild = client.guilds.cache.get("744885612460507145");
    const channel = guild.channels.cache.get("744979670847455275");
    if (!channel) return;
    if (message.channel === channel) {
      const r = await message.react("⭐");
      setInterval(() => {
        if (r.users.reaction.users.cache.size > 10) {
          message.pin({ reason: "Favorite Meme" });
        }
      }, 12000);
    }
  });
};
