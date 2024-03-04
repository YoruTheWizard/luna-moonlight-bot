const { SlashCommandBuilder, Client } = require('discord.js');
const { setActivity, clearActivity } = require("../../utils/setBotActivity");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('atividade')
    .setDescription('Atividade da Luna')

    .addSubcommand(sub => sub
      .setName('configurar')
      .setDescription('Configura a atividade da Luna')
      .addStringOption(opt => opt
        .setName('tipo')
        .setDescription('O tipo de atividade')
        .addChoices(
          { name: 'Ouvindo', value: 'listening' },
          { name: 'Jogando', value: 'playing' },
          { name: 'Assistindo', value: 'watching' }
        )
        .setRequired(true)
      )
      .addStringOption(opt => opt
        .setName('texto')
        .setDescription('Texto da atividade')
        .setRequired(true)
      )
    )

    .addSubcommand(sub => sub
      .setName('limpar')
      .setDescription('Limpa a atividade da Luna')),

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
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'configurar': setActivity(interaction, client); break;
      case 'limpar': clearActivity(interaction, client);
    }
  }
};
