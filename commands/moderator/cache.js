const sendError = require("../../data/error");

module.exports = {
  name: "cache",
  cooldown: 10,
  category: "Moderation",
  permissions: ["MANAGE_MESSAGES"],
  description: "Show cache guild",
  execute(message, args) {
    const data = args[0];
    if (!data) {
      sendError(
        "Invalid syntax! .cache [ban | invites | kick ]",
        message.channel
      );
    }
  },
};
