const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const holidayEmbedGenerator = require('../../utils/holidayEmbedGenerator');

module.exports = {
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

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: (client, interaction) => {
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