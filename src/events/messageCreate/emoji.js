const { Client, Message } = require('discord.js');
const emojis = require('../../json/emojis.json');
const { family } = require('../../config.json');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  const msg = message.content.toLowerCase().replace(/[*_#]/g, '');
  if (msg === 'luna' || msg === 'luninha') {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => { message.reply(emojis.luna); }, 1100);
    return;
  }
  if (message.author.id === family[0]) {
    if (msg.includes('papai') && msg.includes('ama')) {
      setTimeout(() => { message.channel.sendTyping(); }, 1000);
      setTimeout(() => { message.reply(emojis.roll); }, 1100);
      return;
    }
  }
  if (msg === 'fofo') {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => { message.reply(emojis.cute); }, 1100);
    return;
  }
};