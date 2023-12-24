const { Client, Message } = require("discord.js");
const messageTreater = require("../../utils/messageTreater");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  let msg = messageTreater(message);
  if (msg !== 'boanoiteluna' && msg !== 'bahnocheluna') return;
  message.channel.sendTyping();
  setTimeout(async () => {
    const hr = new Date().getHours();
    if (hr < 4 || hr > 18) {
      const member = (await message.guild.members.fetch(message.author.id)).displayName;
      message.reply(`Boa noite **${member}**!`);
      return;
    }
    message.reply('*Mas ainda nem está de noite...*');
  }, 1500);
};