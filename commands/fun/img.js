const sendError = require("../../data/error");
const request = require("request");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "img",
  aliases: ["nekos-life"],
  category: "FUN",
  description: "show image from nekos.life",
  cooldowns: 9,
  usage:
    "['Random_hentai_gif', 'erok', 'lizard', 'bj', 'erokemo', 'tickle', 'feed', 'neko', 'kuni', 'femdom', 'futanari', 'smallboobs', 'goose', 'les', 'trap', 'pat', 'boobs', 'blowjob', 'hentai', 'hololewd', 'ngif', 'fox_girl', 'lewdk', 'solog', 'pussy', 'yuri', 'lewdkemo', 'lewd', 'anal', 'pwankg', 'nsfw_avatar', 'eron', 'kiss', 'pussy_jpg', 'woof', 'keta', 'cuddle', 'eroyuri', 'cum_jpg', 'waifu', 'tits', 'holoero', 'kemonomimi', 'feet', 'erofeet', 'ero', 'cum', 'smug', 'nsfw_neko_gif']",
  async execute(message, args) {
    const endpoint = "https://nekos.life/api/v2/img/";
    const embed = new MessageEmbed()
      .setAuthor(
        "NSFW Image",
        message.author.displayAvatarURL({ dynamic: true, size: 512 })
      )
      .setDescription(`From image ${args[0]}`)
      .setColor("RANDOM")
      .setFooter("Powered by Nekos.life");
    if (message.channel.nsfw) {
      if (!args.length)
        sendError(
          "Incorrect syntax! please use this\n.img ['Random_hentai_gif', 'erok', 'lizard', 'bj', 'erokemo', 'tickle', 'feed', 'neko', 'kuni', 'femdom', 'futanari', 'smallboobs', 'goose', 'les', 'trap', 'pat', 'boobs', 'blowjob', 'hentai', 'hololewd', 'ngif', 'fox_girl', 'lewdk', 'solog', 'pussy', 'yuri', 'lewdkemo', 'lewd', 'anal', 'pwankg', 'nsfw_avatar', 'eron', 'kiss', 'pussy_jpg', 'woof', 'keta', 'cuddle', 'eroyuri', 'cum_jpg', 'waifu', 'tits', 'holoero', 'kemonomimi', 'feet', 'erofeet', 'ero', 'cum', 'smug', 'nsfw_neko_gif']",
          message.channel
        );
      request(`${endpoint}/${args[0]}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var res = JSON.parse(body);
          const embedd = embed.setImage(res.url);
          await message.reply("Wait a second(s)")
          message.channel.send(embedd);
        }
      });
    } else {
      sendError(
        "You can only use this image in NSFW Channel!",
        message.channel
      );
    }
  },
};
