const { Client, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  const msg = message.content.toLowerCase().replace(/[*_#]/g, '');
  if (msg === 'luna' || msg === 'luninha') {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => { message.reply('<:Luna_Moonlight:1189342630061015081>'); }, 1100);
  }
};