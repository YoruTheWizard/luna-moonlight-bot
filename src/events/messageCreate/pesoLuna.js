const { Client, Message } = require("discord.js");
const emojis = require('../../json/emojis.json');
const { getLunaMood } = require('../../utils/utils');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (message, client) => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase();
  if ((msg.includes('luna') || msg.includes('luninha'))
    && msg.includes('quanto') && msg.includes('pesa')) {
    const mood = getLunaMood().state;
    let response;
    switch (mood) {
      case 'happy': response = `${emojis.puff} Não é muito delicado perguntar o peso de uma garota!\nMas, já que insiste, eu peso cerca de *16MB* ${emojis.ara}`; break;
      case 'sad': response = `${emojis.crisis} *eu acho que engordei um pouco...*`; break;
      case 'mad': response = `${emojis.puff} Porque quer saber meu peso? Por acaso acha que eu estou gorda, é??? ${emojis.puff}`;
    }

    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => { message.reply(response); }, 2500);
  }
};