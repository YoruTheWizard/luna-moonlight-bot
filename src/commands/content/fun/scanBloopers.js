const { SlashCommandBuilder, Client, Interaction } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('perolasdoservidor')
    .setDescription('Manda aleatoriamente uma pérola do servidor'),

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0
   */
  run: async ({ interaction, client }) => {
    const bloopers = require('../../../json/scanBloopers.json');
    const rand = parseInt(Math.random() * bloopers.length);
    interaction.reply(bloopers[rand]);
  }
};