const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require('discord.js');
const { getTitlesChoices, listTreater, errorLogger, sendEmbeds } = require('../../../utils/utils');

module.exports = {
  staffOnly: true,
  data: {
    name: 'recrutamento',
    description: '[Staff] Manda um anúncio de recrutamento para todos no servidor',
    options: [
      {
        name: 'obra',
        description: 'A obra na qual está precisando de ajuda',
        choices: getTitlesChoices(),
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'cargos',
        description: 'Cargos requisitados, separados por vírgula',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'requisitos',
        description: 'Requisitos para o recrutamento, separados por vírgula',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'comentario',
        description: 'Mais informações sobre o anúncio',
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'contato',
        description: 'Onde falar com você',
        type: ApplicationCommandOptionType.String
      }
    ],
  },

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0 
   */
  run: async ({ interaction, client }) => {
    const titleName = interaction.options.get('obra').value,
      roles = listTreater(interaction.options.get('cargos').value),
      requirements = listTreater(interaction.options.get('requisitos').value),
      comment = interaction.options.get('comentario')?.value,
      contact = interaction.options.get('contato')?.value;

    const scanTitles = require('../../../json/scanTitles.json');
    let titleObj;
    for (let title of scanTitles)
      if (title.id === titleName) {
        titleObj = title;
        break;
      }

    try {
      const recruitment = new EmbedBuilder()
        .setColor(titleObj.color)
        .setAuthor({
          name: interaction.member.displayName,
          iconURL: interaction.member.displayAvatarURL()
        })
        .setTitle('Estamos recrutando!')
        .setDescription(`<@${interaction.member.id}> está solicitando membros para axuiliarem em **${titleObj.name}**.`)
        .addFields(
          {
            name: 'Cargo(s) requeridos',
            value: roles,
            inline: true
          },
          {
            name: 'Requisitos',
            value: requirements,
            inline: true
          },
        );

      if (comment)
        recruitment.addFields({ name: 'Mais informações', value: comment });

      recruitment.addFields({
        name: 'Contato',
        value: contact || `Mande uma mensagem para **${interaction.member.displayName}** pelo privado do discord!`
      });

      await sendEmbeds({
        interaction,
        embeds: [recruitment],
        ephemeral: true
      });
      // interaction.channel.send({ content: '@everyone', embeds: [recruitment] });
      // interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
    } catch (err) {
      errorLogger('recrutamento', err);
    }
  }
};