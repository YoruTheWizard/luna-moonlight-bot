const { Client, Message } = require("discord.js");
const messageTreater = require("../../utils/messageTreater");


/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  let msg = messageTreater(message);
  if (msg !== 'bomdialuna') return;
  message.channel.sendTyping();
  setTimeout(() => {
    message.reply(`Bom dia **${message.author.displayName}**!`);
  }, 1500);
};