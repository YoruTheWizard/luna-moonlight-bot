const { Client, Message } = require("discord.js");
const messageAuthorFilter = require('../../utils/messageAuthorFilter');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (message, client) => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase().replace(/[^a-záàãâéêíóõôú ]/g, '').split(' ');
  if (msg.includes('luna') || msg.includes('luninha')) {
    const member = await message.guild.members.fetch(message.author.id),
      hr = new Date().getHours() + ((new Date().getTimezoneOffset() / 60) - 3);
    let typingTime = 1000,
      msgTime = 1500,
      response;

    // HOW ARE YOU
    if ((msg.includes('como') && (msg.includes('vai') || msg.includes('está'))))
      response = messageAuthorFilter('Olá', member, '! Estou bem. E você?');

    // HELLO
    if (!response && (msg.includes('olá') || (msg.includes('oi') && !msg.includes('noite'))))
      response = messageAuthorFilter('Olá', member);

    // GOOD MORNING
    if (!response && (msg.includes('bom') && msg.includes('dia'))) {
      if (hr >= 4 && hr < 18)
        response = messageAuthorFilter('Bom dia', member);
      else response = '*Mas já está de noite...*';
    }

    if (!response && (msg.includes('boa') || msg.includes('bah'))) {

      // GOOD AFTERNOON
      if (msg.includes('tarde')) {
        if (hr >= 12 && hr < 18)
          response = messageAuthorFilter('Boa tarde', member);
        else if (hr < 12)
          response = '*Mas ainda não é de tarde...*';
        else response = '*Mas já está de noite...*';
      }

      // GOOD EVENING/NIGHT
      else if (msg.includes('noite') || msg.includes('noche')) {
        if (hr < 4 || hr > 18)
          response = messageAuthorFilter('Boa noite', member);
        else response = '*Mas ainda nem está de noite...*';
      }
    }

    // RESPONSE
    if (response) {
      setTimeout(() => { message.channel.sendTyping(); }, typingTime);
      setTimeout(() => { message.reply(response); }, msgTime);
    }
  }
};