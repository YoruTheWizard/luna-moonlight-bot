const { ApplicationCommandOptionType, PermissionFlagsBits, Client, Interaction } = require("discord.js");
const { welcomeOn } = require('../../config.json');

module.exports = {
  devOnly: false,
  testOnly: false,
  deleted: false,

  name: 'desabilitarbemvindo',
  description: 'Desabilita mensagens de bem-vindo e adeus no servidor',
  permissionsRequired: PermissionFlagsBits.Administrator,
  botPermissions: PermissionFlagsBits.Administrator,

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    await interaction.deferReply();
    if (welcomeOn.filter().length === 0) {
      await interaction.editReply({ content: 'As mensagens de bem-vindo não estão habilitadas neste servidor!', ephemeral: true });
      return;
    }

    welcomeOn = welcomeOn.filter(e => e.server !== interaction.guild.id);
    await interaction.editReply('Mensagens de bem-vindo desabilitadas neste servidor.');
  }
};