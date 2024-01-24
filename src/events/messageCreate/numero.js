const { Client, Message } = require('discord.js');
const family = require('../../json/family.json');
const emojis = require('../../json/emojis.json');
const { getLunaMood } = require('../../utils/utils');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (message, client) => {
  if (message.author.bot) return;
  const msg = message.content.toLowerCase();
  if ((msg.includes('luna') || msg.includes('luninha'))
    && (msg.includes('numero') || msg.includes('número') || msg.includes('zap'))) {
    const mood = getLunaMood().state;
    let response, isFamily = false;
    for (let familyMember of family)
      if (message.author.id === familyMember.id) isFamily = true;
    if (isFamily)
      response = mood === 'mad'
        ? `${emojis.puff} Você já tem meu número!`
        : '*Mas você já tem meu número...*';
    else response = mood === 'mad'
      ? `${emojis.puff} *Quer meu número para que?*`
      : `*Para que você quer meu número...?* ${emojis.analysis}`;
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => { message.reply(response); }, 5000);
  }
};