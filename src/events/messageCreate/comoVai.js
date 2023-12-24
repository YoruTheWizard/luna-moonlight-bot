const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  let msg = message.content.toLowerCase();
  if (msg.includes('luna') && msg.includes('como') && msg.includes('vai')) {
    message.channel.sendTyping();
    setTimeout(async () => {
      const member = (await message.guild.members.fetch(message.author.id)).displayName;
      message.reply(`Olá **${member}**! Vou bem. E você?`);
    }, 1500);
  }
};