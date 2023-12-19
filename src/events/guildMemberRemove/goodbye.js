const fs = require('fs');
const { Client, GuildMember } = require("discord.js");
const path = require('path');
const config = require(path.resolve(__dirname, '..', '..', 'config.json'));
const pathToGoodbyeEmbed = path.resolve(__dirname, '..', '..', 'embeds', 'goodbyeEmbed.json');
const goodbyeEmbed = require(pathToGoodbyeEmbed);

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
  try {
    if (!member.guild) return;

    let welcomeChannelId;
    for (let obj of config.welcomeOn)
      if (obj.server === member.guild.id) welcomeChannelId = obj.channel;
    // JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
    //   .welcomeOn.forEach(e => {
    //     if (e.server === member.guild.id) {
    //       welcomeChannelId = e.channel;
    //     }
    //   });
    if (!welcomeChannelId) return;

    const welcomeChannel = await member.guild.channels.fetch(welcomeChannelId);
    const guild = member.guild;

    goodbyeEmbed.description = goodbyeEmbed.description
      .replace('{member}', member.displayName)
      .replace('{guildName}', guild.name);

    welcomeChannel.send({ content: `<@${member.id}>`, embeds: [goodbyeEmbed] });
  } catch (err) {
    console.error(`Error while sending welcome message: \n${err}`);
  }
};