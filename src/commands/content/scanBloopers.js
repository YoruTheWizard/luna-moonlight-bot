const { Client, Interaction } = require('discord.js');

module.exports = {
  devOnly: false,
  testOnly: false,
  deleted: false,

  name: 'perolasdoservidor',
  description: 'Manda aleatoriamente uma pérola do servidor',

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    const bloopers = require('../../json/scanBloopers.json');
    await interaction.deferReply();
    const rand = parseInt(Math.random() * bloopers.length);
    interaction.editReply(bloopers[rand]);
  }
};