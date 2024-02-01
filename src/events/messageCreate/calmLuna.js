const { Message, Client } = require('discord.js');
const { getLunaMood } = require('../../utils/utils');
const emojis = require('../../json/emojis.json');
const changeLunaMood = require('../../utils/changeLunaMood');

/**
 * 
 * @param {Message} message 
 * @param {Client} client 
 */
module.exports = (message, client) => {
  if (message.author.bot) return;
  const mood = getLunaMood();
  if (message.content.includes('🍩')) {
    message.reply(emojis.eating);
    if (mood.isPermanent) return;
    if (mood.state !== 'happy') changeLunaMood('happy', null);
  }
};