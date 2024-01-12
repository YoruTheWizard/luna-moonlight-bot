const { Client, Message } = require('discord.js');
const { messageAuthorFilter } = require('../../utils/utils');

/**
 * 
 * @param {Message} message 
 * @param {Client} client 
 */
module.exports = (message, client) => {
  const msg = message.content.toLowerCase();
  if ((msg.includes('luna') || msg.includes('luninha'))
    && msg.includes('feliz')) {
    if (msg.includes('ano') && msg.includes('novo')) {
      const offset = new Date().getTimezoneOffset() * 60000;
      const now = new Date(new Date() + offset);
      const day = now.getDate(),
        month = now.getMonth() + 1;
      if (day === 1 && month === 1) {
        const author = message.guild.members.cache.get(message.author.id);
        message.reply(messageAuthorFilter('Feliz ano novo', author, '!'));
        return;
      }
    }
  }
};