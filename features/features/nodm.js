const sendError = require("../../data/error");
module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
      sendError(
        "You cannot use commands/chat in my DM's!\nPlease do not spamed anything in DM!",
        message.channel
      );
    }
  });
};
