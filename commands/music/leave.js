module.exports = {
  name: "leave",
  guildOnly: true,
  category: "Music",
  async execute(message, args) {
    const { channel } = message.member.voice;
    try {
      await channel.leave();
      message.reply(`Leave from ${channel.name}`);
    } catch (e) {
      message.reply("Error!");
    }
  },
};
