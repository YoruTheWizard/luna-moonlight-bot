const { Client, Message } = require("discord.js");
const { messageAuthorFilter } = require('../../utils/utils');

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
      response = messageAuthorFilter('Olá', member, '! Estou bem, e você?');

    // HELLO
    if (!response && (msg.includes('olá') || (msg.includes('oi') && !msg.includes('noite'))))
      response = messageAuthorFilter('olá', member);

    // GOOD MORNING
    if (!response && (msg.includes('bom') && msg.includes('dia'))) {
      if (hr >= 4 && hr < 18)
        response = messageAuthorFilter('bom dia', member);
      else response = '*Mas já está de noite...*';
    }

    if (!response && (msg.includes('boa') || msg.includes('bah'))) {

      // GOOD AFTERNOON
      if (msg.includes('tarde')) {
        if (hr >= 12 && hr < 18)
          response = messageAuthorFilter('boa tarde', member);
        else if (hr < 12)
          response = '*mas ainda não é de tarde...*';
        else response = '*mas já está de noite...*';
      }

      // GOOD EVENING/NIGHT
      else if (msg.includes('noite') || msg.includes('noche')) {
        if (hr < 4 || hr > 18)
          response = messageAuthorFilter('boa noite', member);
        else response = '*mas ainda nem está de noite...*';
      }
    }

    // RESPONSE
    if (response) {
      setTimeout(() => { message.channel.sendTyping(); }, typingTime);
      setTimeout(() => { message.reply(response); }, msgTime);
    }
  }
};