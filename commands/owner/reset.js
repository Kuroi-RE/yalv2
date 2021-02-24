module.exports = {
  name: "reset-guild",
  async execute(message, args) {
    const { owner } = require("../../data/config.json");
    if (message.author.id !== owner)
      return message.reply("Only owner can execute this");
    message.guild.channels.cache.forEach((channel) =>
      channel
        .delete()
        .catch((e) => message.author.send(`Cannot delete all channel!\n${e}`))
    );
  },
};
