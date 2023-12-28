const { Client, Message } = require('discord.js');
const { family } = require('../../config.json');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  if (message.author.bot) return;
  const msg = message.content.toLowerCase();
  if (msg.includes('luna') && (msg.includes('numero') || msg.includes('número') || msg.includes('zap'))) {
    let response;
    if (family.includes(message.author.id)) response = '*Mas você já tem meu número...*';
    else response = '*Para que você quer meu número...?* <:Luna_Humm:1189348391617036418>';
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => { message.reply(response); }, 5000);
  }
};