const { Client, Message } = require("discord.js");


/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  let msg = message.content.toLowerCase().replace(/[.,!]/g, '');
  if (msg !== 'bom dia luna') return;
  message.reply(`Bom dia **${message.author.displayName}**!`);
};