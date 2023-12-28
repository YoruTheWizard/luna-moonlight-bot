const { Client, Message } = require("discord.js");
const messageTreater = require("../../utils/messageTreater");
const messageAuthorFilter = require('../../utils/messageAuthorFilter');
const wait = require('node:timers/promises').setTimeout;

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase();
  if (msg.includes('luna') && (msg.includes('olá')
    || (msg.includes('oi') && !msg.includes('noite')))) {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(async () => {
      const member = await message.guild.members.fetch(message.author.id);
      message.reply(messageAuthorFilter('Olá', member));
    }, 1500);
  }
};