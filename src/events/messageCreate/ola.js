const { Client, Message } = require("discord.js");
const messageTreater = require("../../utils/messageTreater");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  let msg = messageTreater(message);
  if (msg === 'oi luna' || msg === 'olá luna')
    message.reply(`Olá, **${message.author.displayName}**!`);
};