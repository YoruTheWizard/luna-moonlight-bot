const { Client, Message } = require("discord.js");
const messageTreater = require("../../utils/messageTreater");
const wait = require('node:timers/promises').setTimeout;

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  let msg = messageTreater(message);
  if (!(msg === 'oiluna' || msg === 'oláluna')) return;
  message.channel.sendTyping();
  setTimeout(() => { message.reply(`Olá, **${message.author.displayName}**!`); }, 1500);
};