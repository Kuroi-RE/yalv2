const { MessageEmbed } = require("discord.js");
const request = require("request");
const sendError = require("../../data/error");
module.exports = {
  name: "slap",
  description: "Slapped someone!",
  usage: "[user]",
  category: "FUN",
  async execute(message, args) {
    const urlAPI = "https://nekos.life/api/v2/img/slap";
    request(urlAPI, function (error, response, body) {
      if (!error || response.statusCode === 200) {
        const tar = message.mentions.members.first();
        var resp = JSON.parse(body);
        if (!tar) {
          sendError(
            "You must mentions someone!\nUsage: .slap [user mention]",
            message.channel
          );
        }
        if (tar) {
          if (tar.id === message.author.id) {
            const emb = new MessageEmbed()
              .setAuthor(
                `${message.author.username} Slapped ${tar.user.username}`
              )
              .setDescription(
                "What????????????????????????????????????????????"
              )
              .setImage(resp.url)
              .setColor(
                tar.displayHexColor ||
                  message.members.displayHexColor ||
                  "RANDOM"
              )
              .setFooter("Powered by Nekos.life");
            message.channel.send(emb);
          } else if (tar.user.bot) {
            const em = new MessageEmbed()
              .setAuthor(
                `${message.author.username} Slapped ${tar.user.username}`
              )
              .setDescription("Are you hate the bot?-'")
              .setImage(resp.url)
              .setColor(
                tar.displayHexColor ||
                  message.members.displayHexColor ||
                  "RANDOM"
              )
              .setFooter("Powered by Nekos.life");
            message.channel.send(em);
          } else {
            const embed = new MessageEmbed()
              .setAuthor(
                `${message.author.username} Slapped ${tar.user.username}`
              )
              .setImage(resp.url)
              .setColor(
                tar.displayHexColor ||
                  message.members.displayHexColor ||
                  "RANDOM"
              )
              .setFooter("Powered by Nekos.life");
            message.channel.send(embed);
          }
        }
      }
    });
  },
};
