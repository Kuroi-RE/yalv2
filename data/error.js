const { MessageEmbed } = require("discord.js");

/**
 * Easy to send errors because im lazy to do the same things :p
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */
module.exports = async (text, channel) => {
  let embed = new MessageEmbed()
    .setAuthor("YalBots Error Message")
    .setColor("RED")
    .setDescription(text)
    .setThumbnail(
      "https://media1.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif"
    );
  await channel.send(embed);
};
