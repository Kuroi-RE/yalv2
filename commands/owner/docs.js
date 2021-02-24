const axios = require("axios");
const sendError = require("../../data/error");
const { owner } = require("../../data/config.json");
module.exports = {
  name: "docs",
  aliases: ["discord"],
  category: "Onwer Only",
  usage: "[docs name]",
  description: "Show discord js Docs",
  async execute(message, args) {
    if (message.author.id !== owner) {
      sendError(
        "You cannot use this command! [Only owner can executed this commands.]",
        message.channel
      );
    }
    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`;

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed;

        if (data && !data.error) {
          message.channel.send({ embed: data });
        } else {
          sendError("Could not find that documentation", message.channel);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
