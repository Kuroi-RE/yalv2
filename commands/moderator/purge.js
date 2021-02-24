const sendError = require("../../data/error");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  permissions: ["MANAGE_MESSAGES"],
  category: "Moderation",
  desription: "Delete message with amount",
  usage: "[amount]",
  async execute(message, args) {
    const delnum = args[0];
    if (isNaN(delnum)) {
      sendError("The arguments must be Number!", message.channel);
    } else {
      const delChannel = message.channel;
      const delNumb = parseInt(delnum) + 1;
      delChannel
        .bulkDelete(delNumb)
        .then((deletedMessage) => {
          //   const total = deletedMessage.size;
          const abc = new MessageEmbed()
            .setAuthor(
              `${message.channel.name} Message Manager`,
              message.guild.iconURL()
            )
            .setDescription(`Deleted ${delnum} Message!`);
          delChannel
            .send(abc)
            .then((message) => message.delete({ timeout: 10000 }));
        })
        .catch((Err) => {
          console.log(Err);
          sendError(
            "Failed to delete messages. This may be caused by attempting to delete messages that are over 2 weeks old.",
            message.channel
          );
        });
    }
  },
};
