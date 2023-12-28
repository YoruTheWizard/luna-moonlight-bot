const { Client, Message } = require("discord.js");
const { family } = require("../../config.json");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase();
  if (msg.includes('luna')
    && (msg.includes('boa') || msg.includes('bah'))
    && (msg.includes('noite') || msg.includes('noche'))
  ) {
    setTimeout(() => { message.channel.sendTyping(); }, 1000);
    setTimeout(async () => {
      const hr = new Date().getHours() + 5;
      let response;
      if (hr < 4 || hr > 18) {
        const member = await message.guild.members.fetch(message.author.id);
        if (member.id === family[0]) response = 'Boa noite, **Pai**!';
        else if (family.includes(member.id)) response = `Boa noite, tio **${member.displayName}**`;
        else response = `Boa noite, **${member.displayName}**!`;
      } else response = '*Mas ainda nem está de noite...*';
      message.reply(response);
    }, 1500);
  }
};