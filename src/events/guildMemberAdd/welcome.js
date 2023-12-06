const fs = require('fs');
const { Client, GuildMember } = require("discord.js");
const path = require('path');

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
  try {
    if (!member.guild) return;

    const filePath = path.resolve(__dirname, '..', '..', '..', 'config.json');
    let welcomeChannelId;
    JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
      .welcomeOn.forEach(e => {
        if (e.server === member.guild.id) {
          welcomeChannelId = e.channel;
        }
      });
    if (!welcomeChannelId) return;

    const welcomeChannel = await member.guild.channels.fetch(welcomeChannelId);
    welcomeChannel.send(`Seja bem vindo **${member.user.username}**!`);

  } catch (err) {
    console.error(`Error while sending welcome message: \n${err}`);
  }
};