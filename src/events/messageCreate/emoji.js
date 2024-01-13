const { Client, Message } = require('discord.js');
const emojis = require('../../json/emojis.json');
const { family } = require('../../config.json');

/**
 * 
 * @param {Message} message 
 * @param {Client} client 
 */
module.exports = (message, client) => {
  if (message.author.bot) return;
  const msg = message.content.toLowerCase().replace(/[^a-záàãéíóõú ]/g, '').split(' ');
  let typingTime = 1000,
    answerTime = 1200,
    response;

  if (msg.includes('luna') || msg.includes('luninha')) {

    // AGREE
    if (msg.includes('né') || msg.includes('ne') || msg.includes('concorda'))
      response = emojis.confused;

    // JUST LUNA
    else if (msg.length === 1)
      response = emojis.luna;
  }

  if (!response && (message.author.id === family[0])) {
    // DADDY LOVES
    if (msg.includes('papai') && msg.includes('ama'))
      response = emojis.roll;

    // FULL NAME
    if (msg.length === 2 && msg.includes('luna') && msg.includes('moonlight'))
      response = emojis.uwa;

    // LUNA GROUNDED
    if (msg.includes('luna') && msg.includes('castigo'))
      response = emojis.crisis;
  }

  if (!response && msg.length === 1) {
    // CUTE
    if (!response && (msg.includes('fofo') || msg.includes('fofa')))
      response = emojis.cute;

    // YAY
    if (!response && (msg.includes('yay') || msg.includes('lenayay')))
      response = emojis.yay;

    if (!response && msg.includes('hmm'))
      response = emojis.analysis;
  }

  if (response) {
    setTimeout(() => { message.channel.sendTyping(); }, typingTime);
    setTimeout(() => { message.reply(response); }, answerTime);
  }
};