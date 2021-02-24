module.exports = {
  name: "say",
  usage: "[anything]",
  async execute(message, args) {
    if (!args.length)
      return message.channel
        .send("You didn't provide any arguments!")
        .then((message) => message.delete({ timeout: 5000 }));
    message.channel.send(args.join(" "));
  },
};
