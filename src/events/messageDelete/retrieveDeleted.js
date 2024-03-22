const { Message, Client } = require("discord.js");
const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {Message} message 
 * @param {Client} client 
 */
module.exports = (message, client) => {
  const filePath = path.resolve(__dirname, '..', '..', 'json', 'deleted_messages.txt');

  const authorId = message.author.id;
  const author = message.guild.members.cache.get(authorId);
  const authorName = author.displayName;

  const channelId = message.channel.id;
  const channel = message.guild.channels.cache.get(channelId).name;

  const date = new Date(message.createdTimestamp)
    .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const content = message.content;

  const data = `=-----=\n-> [${channel}] ${authorName} | ${date}\n${content}\n`;

  try {
    fs.appendFileSync(filePath, data, 'utf8');
  } catch (err) {
    console.log(`Error while writing deleted message:\n${err}`);
  }
};
