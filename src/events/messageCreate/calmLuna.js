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
  const mood = getLunaMood().state;
  if (message.content.includes('🍩')) {
    if (mood !== 'happy') changeLunaMood('happy', null);
    message.reply(emojis.eating);
  }
};