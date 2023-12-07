const { Client, Interaction, EmbedBuilder } = require("discord.js");
const fs = require('fs');
const path = require('path');
const pathToWelcome = path.resolve(__dirname, '..', '..', 'embeds', 'welcomeEmbed.json');
const welcomeEmbed = require(pathToWelcome);
const { testServer } = require('../../../config.json');

module.exports = {
  devOnly: false,
  testOnly: true,
  deleted: false,

  name: 'bemvindo',
  description: 'Envia uma mensagem de bem vindo',

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    const guild = interaction.guild;
    const author = interaction.member;
    await interaction.deferReply();

    welcomeEmbed.author = {
      name: author.name,
      icon_url: author.displayAvatarURL()
    };
    welcomeEmbed.description = welcomeEmbed.description.replace('{member}', author.id);
    welcomeEmbed.title = welcomeEmbed.title.replace('{guildName}', guild.name);
    welcomeEmbed.thumbnail.url = guild.iconURL();
    if (guild.id = testServer) {
      welcomeEmbed.fields[0].name = `<#1181345640362553417>`;
      welcomeEmbed.fields[1].name = `<#1181345640362553417>`;
    } else {
      welcomeEmbed.fields[0].name = `<#${guild.rulesChannelId}>`;
      welcomeEmbed.fields[1].name = `<#1127023074202632223>`;
    }
    welcomeEmbed.footer.text =
      welcomeEmbed.footer.text.replace('{memberCount}', guild.memberCount);
    // welcomeEmbed.fields = [];
    console.log(welcomeEmbed);

    interaction.editReply({ content: `<@${author.id}>`, embeds: [welcomeEmbed] });
  }
};