const { Client, Interaction, EmbedBuilder } = require("discord.js");
const fs = require('fs');
const path = require('path');
const pathToGoodbyeEmbed = path.resolve(__dirname, '..', '..', 'embeds', 'goodbyeEmbed.json');
const goodbyeEmbed = require(pathToGoodbyeEmbed);
const { testServer } = require('../../../config.json');

module.exports = {
  devOnly: false,
  testOnly: true,
  deleted: false,

  name: 'adeus',
  description: 'Envia uma mensagem de adeus',

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    const guild = interaction.guild;
    const author = interaction.member;
    await interaction.deferReply();

    goodbyeEmbed.description = goodbyeEmbed.description
      .replace('{member}', author.displayName)
      .replace('{guildName}', guild.name);

    interaction.editReply({ embeds: [goodbyeEmbed] });
  }
};