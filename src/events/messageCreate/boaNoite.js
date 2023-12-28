const { Client, Message } = require("discord.js");
const { family } = require("../../config.json");
const messageAuthorFilter = require('../../utils/messageAuthorFilter');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase();
  if (msg.includes('luna')
    && (msg.includes('boa') || msg.includes('bah'))
    && (msg.includes('noite') || msg.includes('noche'))
  ) {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(async () => {
      const hr = new Date().getHours() + ((new Date().getTimezoneOffset() / 60) - 3);
      let response;
      if (hr < 4 || hr > 18) {
        const member = await message.guild.members.fetch(message.author.id);
        response = messageAuthorFilter('Boa noite', member);
      } else response = '*Mas ainda nem está de noite...*';
      message.reply(response);
    }, 1500);
  }
};