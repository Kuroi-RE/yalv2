const error = require("../../data/error");
module.exports = {
  name: "ping",
  category: "Fun",
  async execute(message) {
    let startTime = message.createdTimestamp;
    let endTime = new Date().getTime();
    const pong = `:ping_pong: ${Math.round(endTime - startTime)}ms`;
    message.channel.send(pong);
  },
};
