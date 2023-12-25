const { Client, Message } = require("discord.js");
const messageTreater = require("../../utils/messageTreater");
const wait = require('node:timers/promises').setTimeout;

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  let msg = message.content.toLowerCase();
  if (msg.includes('luna') && (msg.includes('olá') || msg.includes('oi'))) {
    message.channel.sendTyping();
    setTimeout(async () => {
      const member = (await message.guild.members.fetch(message.author.id)).displayName;
      message.reply(`Olá, **${member}**!`);
    }, 1500);
  }
};