const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require('discord.js');
const { testServer } = require('../../config.json');
const listTreater = require('../../utils/listTreater');

module.exports = {
  deleted: false,
  name: 'recrutamento',
  description: '[Staff] Manda um anúncio de recrutamento para todos no servidor',
  options: [
    {
      name: 'obra',
      description: 'A obra na qual está precisando de ajuda',
      choices: [],
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

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    if (interaction.guild.id !== testServer)
      if (!interaction.member.roles.cache.some(role => role.id === '1123264880800182352')) interaction.reply({
        content: 'Apenas membros da staff podem usar este comando!',
        ephemeral: true
      });

    const titleName = interaction.options.get('obra').value,
      roles = listTreater(interaction.options.get('cargos').value),
      requirements = listTreater(interaction.options.get('requisitos').value),
      comment = (interaction.options.get('comentario')?.value
        || 'Nenhuma informação adicional providenciada.'),
      contact = (interaction.options.get('contato')?.value
        || `Mande uma mensagem para ${interaction.member.displayName} pelo privado do discord!`);

    const scanTitles = require('../../json/scanTitles.json');
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
        .setDescription(`<@${interaction.member.id}> está solicitando membros para axuiliarem em **${titleObj.name}**`)
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
          {
            name: 'Mais informações',
            value: comment
          },
          {
            name: 'Contato',
            value: contact
          }
        );

      interaction.channel.send({ content: '@everyone', embeds: [recruitment] });
      interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
    } catch (err) {
      console.error(`Error while running command 'recrutamento':\n${err}`);
    }
  }
};