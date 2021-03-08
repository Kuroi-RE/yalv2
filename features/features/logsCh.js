const discord = require("discord.js");

module.exports = (client) => {
  client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
    const guild = client.guilds.cache.get("744885612460507145");
    const channel = guild.channels.cache.get("744913294715781130");
    if (newVoiceState.guild && oldVoiceState.guild !== guild) return;
    if (newVoiceState.channel) {
      const embed = new discord.MessageEmbed()
        .setAuthor(
          "Voice Channels Manager",
          newVoiceState.member.user.displayAvatarURL()
        )
        .setColor("GREEN")
        .setDescription(
          `**${newVoiceState.member.user.username}** has joined to **${newVoiceState.channel.name}** Channel!`
        )
        .setThumbnail(newVoiceState.guild.iconURL());
      channel.send(embed);
    } else if (oldVoiceState.channel) {
      const embed1 = new discord.MessageEmbed()
        .setAuthor(
          "Voice Channels Manager",
          oldVoiceState.member.user.displayAvatarURL()
        )
        .setColor("GREEN")
        .setDescription(
          `**${oldVoiceState.member.user.username}** Leaved from **${oldVoiceState.channel.name}** Channel!`
        )
        .setThumbnail(oldVoiceState.guild.iconURL());
      channel.send(embed1);
    }
  });
};
