const { Client, Message } = require("discord.js");
const messageTreater = require("../../utils/messageTreater");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase();
  if (msg.includes('luna') && msg.includes('bom') && msg.includes('dia')) {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(async () => {
      const hr = new Date().getHours() - 5;
      if (hr > 4 && hr < 18) {
        const member = (await message.guild.members.fetch(message.author.id)).displayName;
        message.reply(`Bom dia **${member}**!`);
        return;
      }
      message.reply('*Mas já está de noite...*');
    }, 1500);
  }
};