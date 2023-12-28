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

    const welcomeChannel = await member.guild.channels.fetch(welcomeChannelId),
      guild = member.guild,
      channel1 = guild.id === testServer ? '1181345640362553417' : guild.rulesChannelId,
      channel2 = guild.id === testServer ? '1181345640362553417' : '1174335547716673666',
      channel3 = guild.id === testServer ? '1181345640362553417' : '1123194351552565332';

    const welcomeEmbed = new EmbedBuilder()
      .setColor(15844367)
      .setAuthor({
        name: member.displayName,
        iconURL: member.displayAvatarURL()
      })
      .setTitle(`Seja bem-vido(a) ao ${guild.name}`)
      .setDescription(`Olá <@${member.id}>, espero que você se divirta na Moonlight Valley!<:mahiru_estrelando:1136142729219416086>`)
      .addFields(
        {
          name: `<#${channel1}>`,
          value: 'Acesse o canal de regras para uma boa convivência com nossos leitores.',
          inline: true
        },
        {
          name: `<#${channel2}>`,
          value: 'Novos capítulos ou volumes são anunciados no canal de lançamentos.',
          inline: true
        },
        {
          name: `<#${channel3}>`,
          value: 'Confira o canal de anúncios para ficar por dentro das atualizações na scan!',
          // inline: true
        }
      )
      .setImage('https://cdn.discordapp.com/attachments/1189268273028665404/1189280934026031144/Bem_Vindo_a_Moonlight_Valley.jpg?ex=659d972e&is=658b222e&hm=435cde1f5b80c1f97cedb0c5995f20a2bcb8a0fa9af85cdc08b4183dd8550c77&')
      .setThumbnail(guild.iconURL())
      .setFooter({ text: `Membro No. ${guild.memberCount}` });

    welcomeChannel.send({ content: `<@${member.id}>`, embeds: [welcomeEmbed] });
  } catch (err) {
    console.error(`Error while sending welcome message: \n${err}`);
  }
};