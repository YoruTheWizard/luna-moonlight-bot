const { Client, Message } = require('discord.js');
const emojis = require('../../json/emojis.json');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  const msg = message.content.toLowerCase();
  if ((msg.includes('luna') || msg.includes('luninha'))
    && (msg.includes('né') || msg.includes('ne') || msg.includes('concorda'))) {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => { message.reply(emojis.confused); }, 1100);
  }
};