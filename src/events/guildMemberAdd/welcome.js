const fs = require('fs');
const { Client, GuildMember } = require("discord.js");
const path = require('path');
const config = require(path.resolve(__dirname, '..', '..', 'config.json'));
const pathToWelcome = path.resolve(__dirname, '..', '..', 'embeds', 'welcomeEmbed.json');
const welcomeEmbed = require(pathToWelcome);

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

    welcomeEmbed.author = {
      name: member.name,
      icon_url: member.displayAvatarURL()
    };
    welcomeEmbed.description = welcomeEmbed.description.replace('{member}', member.id);
    welcomeEmbed.title = welcomeEmbed.title.replace('{guildName}', guild.name);
    welcomeEmbed.thumbnail.url = guild.iconURL();
    if (guild.id = config.testServer) {
      welcomeEmbed.fields[0].name = `<#1181345640362553417>`;
      welcomeEmbed.fields[1].name = `<#1181345640362553417>`;
    } else {
      welcomeEmbed.fields[0].name = `<#${guild.rulesChannelId}>`;
      welcomeEmbed.fields[1].name = `<#1127023074202632223>`;
    }
    welcomeEmbed.footer.text =
      welcomeEmbed.footer.text.replace('{memberCount}', guild.memberCount);

    welcomeChannel.send({ content: `<@${member.id}>`, embeds: [welcomeEmbed] });
  } catch (err) {
    console.error(`Error while sending welcome message: \n${err}`);
  }
};