const { Client, Message } = require("discord.js");
const { messageAuthorFilter, getLunaMood } = require('../../utils/utils');
const emojis = require('../../json/emojis.json');

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
      response,
      notAfternoon,
      alreadyNight,
      notNight;

    // Check mood
    const mood = getLunaMood().state;
    switch (mood) {
      case 'happy': {
        notAfternoon = '*Mas ainda não é de tarde...*';
        alreadyNight = '*Mas já está de noite...*';
        notNight = '*Mas ainda nem está de noite...*';
        break;
      }
      case 'sad': {
        notAfternoon = '*mas ainda não é de tarde...*';
        alreadyNight = '*mas já está de noite...*';
        notNight = '*mas ainda nem está de noite...*';
        break;
      }
      case 'mad': {
        let clock = '***Veja o relógio!***';
        notAfternoon = `${clock} Nem está de tarde ainda! ${emojis.puff}`;
        alreadyNight = `${clock} Já é de noite! ${emojis.puff}`;
        notNight = `${clock} Nem está de noite ainda! ${emojis.puff}`;
      }
    }

    // HOW ARE YOU
    if ((msg.includes('como') && (msg.includes('vai') || msg.includes('está'))))
      response = messageAuthorFilter('Olá', member, '! Estou bem, e você?');

    // HELLO
    if (!response && (msg.includes('olá') || (msg.includes('oi') && !msg.includes('noite'))))
      response = messageAuthorFilter('Olá', member);

    // GOOD MORNING
    if (!response && (msg.includes('bom') && msg.includes('dia'))) {
      if (hr >= 4 && hr < 18)
        response = messageAuthorFilter('Bom dia', member);
      else response = alreadyNight;
    }

    if (!response && (msg.includes('boa') || msg.includes('bah'))) {

      // GOOD AFTERNOON
      if (msg.includes('tarde')) {
        if (hr >= 12 && hr < 18)
          response = messageAuthorFilter('Boa tarde', member);
        else if (hr < 12)
          response = notAfternoon;
        else response = alreadyNight;
      }

      // GOOD EVENING/NIGHT
      else if (msg.includes('noite') || msg.includes('noche')) {
        if (hr < 4 || hr >= 18)
          response = messageAuthorFilter('Boa noite', member);
        else response = notNight;
      }
    }

    // RESPONSE
    if (response) {
      setTimeout(() => { message.channel.sendTyping(); }, typingTime);
      setTimeout(() => { message.reply(response); }, msgTime);
    }
  }
};