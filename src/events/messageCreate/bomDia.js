const { Client, Message } = require("discord.js");
const messageTreater = require("../../utils/messageTreater");


/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  let msg = messageTreater(message);
  if (msg === 'bom dia luna')
    message.reply(`Bom dia **${message.author.displayName}**!`);
};