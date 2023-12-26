const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase();
  if (msg.includes('luna') && msg.includes('como')
    && (msg.includes('vai') || msg.includes('está'))) {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(async () => {
      const member = (await message.guild.members.fetch(message.author.id)).displayName;
      message.reply(`Olá **${member}**! Estou bem. E você?`);
    }, 1500);
  }
};