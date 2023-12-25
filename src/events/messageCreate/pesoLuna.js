const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
  let msg = message.content.toLowerCase();
  if (msg.includes('luna') && msg.includes('quanto') && msg.includes('pesa')) {
    message.channel.sendTyping();
    setTimeout(() => {
      message.reply('<:luna_hmph:1187194403442397224>Não é muito delicado perguntar o peso de uma garota!\nMas, já que insiste, eu peso cerca de *16MB* <:luna_ara:1187194616173301770>');
    }, 2500);
  }
};