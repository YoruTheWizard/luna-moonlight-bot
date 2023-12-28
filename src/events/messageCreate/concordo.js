const { Client, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  const msg = message.content.toLowerCase();
  if (msg.includes('luna') && (msg.includes('né') || msg.includes('ne'))) {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => { message.reply('<:mahiru_confusa:1134489694856556635>'); }, 1100);
  }
};