const { Client, Message } = require("discord.js");
const emojis = require('../../json/emojis.json');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase();
  if ((msg.includes('luna') || msg.includes('luninha'))
    && msg.includes('quanto') && msg.includes('pesa')) {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(() => {
      message.reply(`${emojis.puff} Não é muito delicado perguntar o peso de uma garota!\nMas, já que insiste, eu peso cerca de *16MB* ${emojis.ara}`);
    }, 2500);
  }
};