const { CommandKit } = require("commandkit");
const { SlashCommandBuilder } = require('discord.js');
const { errorLogger } = require("../../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('recarregarcomandos')
    .setDescription('[Dev] Recarrega os comandos do bot')
    .addStringOption(opt => opt
      .setName('tipo-comando')
      .setDescription('Quais comandos para recarregar')
      .addChoices(
        { name: 'Desenvolvedor', value: 'dev' },
        { name: 'Globais', value: 'global' }
      )
    ),

  options: {
    devOnly: true
  },

  /**
   * 
   * @param {{
   *   interaction: import("discord.js").Interaction,
   *   handler: CommandKit
   * }} param0 
   */
  run: async ({ interaction, handler }) => {
    const type = interaction.options.get('tipo-comando')?.value;

    let resp, respEng;
    switch (type) {
      case 'dev':
        resp = ' de desenvolvedor';
        respEng = 'Developer';
        break;
      case 'global':
        resp = ' globais';
        respEng = 'Global';
        break;
      default:
        resp = '';
        respEng = 'All';
    }

    try {
      await interaction.deferReply();
      await handler.reloadCommands(type);

      console.log(`${respEng} commands reloaded.`);
      interaction.followUp(`Comandos${resp} recarregados.`);
    } catch (err) {
      errorLogger('recarregarcomandos', err);
    }
  }
};