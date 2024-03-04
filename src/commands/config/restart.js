const { SlashCommandBuilder, Client } = require('discord.js');
const restart = require("../../utils/restart");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reiniciar')
    .setDescription('Reinicia a aplicação'),

  options: {
    devOnly: true
  },

  /**
   * 
   * @param {{
   *  interaction: import("discord.js").Interaction,
   *  client: Client
   * }} param0 
   */
  run: ({ interaction, client }) => {
    restart(interaction.channel, client);
    interaction.reply({ content: 'Bom dia!', ephemeral: true });
  }
};
