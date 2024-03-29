const { Client, GuildMember, EmbedBuilder } = require("discord.js");
const path = require('path');
const config = require(path.resolve(__dirname, '..', '..', 'config.json'));

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (member, client) => {
  try {
    if (!member.guild) return;

    let welcomeChannelId;
    for (let obj of config.welcomeOn)
      if (obj.server === member.guild.id) welcomeChannelId = obj.channel;
    if (!welcomeChannelId) return;

    const welcomeChannel = await member.guild.channels.fetch(welcomeChannelId);
    const guild = member.guild;

    const goodbyeEmbed = new EmbedBuilder()
      .setColor(0x706897)
      .setTitle('Tchau...')
      .setDescription(`${member.user.username} saiu do ${guild.name}... Espero que algum dia volte...`)
      .setImage('https://cdn.discordapp.com/attachments/1150896257372532756/1162764876796657705/mahiru-shiina_1.gif?ex=653d202d&is=652aab2d&hm=1dc2b72a890d1bb160cac7b5aa42fa14e85cd5ff9cf546a5112e5cee20ad638d&');

    welcomeChannel.send({ embeds: [goodbyeEmbed] });
  } catch (err) {
    console.error(`Error while sending welcome message: \n${err}`);
  }
};