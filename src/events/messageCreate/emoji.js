const { Client, Message } = require('discord.js');
const emojis = require('../../json/emojis.json');
const { family } = require('../../config.json');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  if (message.author.bot) return;
  const msg = message.content.toLowerCase().replace(/[^a-záàãéíóõú]/g, '');
  let typingTime = 1000,
    answerTime = 1200,
    response;

  if (msg.includes('luna') || msg.includes('luninha')) {

    // AGREE
    if (msg.includes('né') || msg.includes('ne') || msg.includes('concorda'))
      response = emojis.confused;

    // JUST LUNA
    else if (msg === 'luna' || msg === 'luninha')
      response = emojis.luna;
  }

  // DADDY LOVES
  if (!response && (message.author.id === family[0]))
    if (msg.includes('papai') && msg.includes('ama'))
      response = emojis.roll;

  // CUTE
  if (!response && (msg === 'fofo' || msg === 'fofa'))
    response = emojis.cute;

  // YAY
  if (!response && (msg === 'yay' || msg === 'lenayay'))
    response = emojis.yay;

  if (!response && msg === 'hmm')
    response = emojis.analysis;

  if (response) {
    setTimeout(() => { message.channel.sendTyping(); }, typingTime);
    setTimeout(() => { message.reply(response); }, answerTime);
  }
};