const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const holidayEmbedGenerator = require('../../utils/holidayEmbedGenerator');

module.exports = {
  data: {
    name: 'feriado',
    description: '[ADM] Envia uma mensagem para um feriado',
    options: [
      {
        name: 'feriado',
        description: 'O feriado para mandar a mensagem',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: 'Ano novo',
            value: 'newyear'
          },
        ]
      }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
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