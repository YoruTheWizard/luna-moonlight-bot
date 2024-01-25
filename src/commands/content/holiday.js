const { SlashCommandBuilder, Client, Interaction } = require('discord.js');
const holidayEmbedGenerator = require('../../utils/holidayEmbedGenerator');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feriado')
    .setDescription('[ADM] Envia uma mensagem para um feriado')
    .addStringOption(opt => opt
      .setName('feriado')
      .setDescription('O feriado para mandar a mensagem')
      .addChoices(
        { name: 'Ano novo', value: 'newyear' },
      )
      .setRequired(true)
    ),

  options: {
    userPermissions: ['Administrator']
  },

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0
   */
  run: async ({ interaction, client }) => {
    const holiday = interaction.options.get('feriado').value;
    let embed;
    switch (holiday) {
      case 'newyear': embed = holidayEmbedGenerator.getNewYearsEmbed(); break;
      default: embed = null;
    }
    interaction.channel.send({ content: '@everyone', embeds: [embed] });
    interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
  }
};