const fs = require("fs");
const sendError = require("./data/error");
const Discord = require("discord.js");
const { prefix } = require("./data/config.json");

module.exports = (client) => {
  client.commands = new Discord.Collection();

  const commandFolders = fs.readdirSync("./commands");

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      client.commands.set(command.name, command);
    }
  }

  const cooldowns = new Discord.Collection();

  client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (command.guildOnly && message.channel.type === "dm") {
      return sendError(
        "I can't execute that command inside DMs!",
        message.channel
      );
    }

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return sendError(
          "[Missing permissions] You cannot use this command!",
          message.channel
        );
      }
    }

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return sendError(reply, message.channel);
    }

    if (command.category) {
      if (command.category === undefined) {
        command.category = "Unspecified";
      }
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return sendError(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`,
          message.channel
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      sendError(
        "there was an error trying to execute that command!",
        message.channel
      );
    }
  });
};
