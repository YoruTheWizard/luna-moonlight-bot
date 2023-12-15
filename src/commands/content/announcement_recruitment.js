const { ApplicationCommandOptionType, Client, Interaction } = require('discord.js');
const { testServer } = require('../../config.json');

module.exports = {
  name: 'recrutamento',
  description: 'Manda um anúncio de recrutamento para todos no servidor',
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
      roles = interaction.options.get('cargos').value.split(', '),
      requirements = interaction.options.get('requisitos').value.split(', '),
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

    await interaction.deferReply();

    try {
      const recruitment = require('../../embeds/recruitmentEmbed.json');

      recruitment.color = parseInt(titleObj.color);
      recruitment.author.name = interaction.member.displayName;
      recruitment.author.icon_url = interaction.member.displayAvatarURL();
      recruitment.description = recruitment.description
        .replace('{authorId}', interaction.member.id)
        .replace('{titleName}', titleObj.name);
      recruitment.fields[0].value = '- '.concat(roles.join('\n- '));
      recruitment.fields[1].value = '- '.concat(requirements.join('\n- '));
      recruitment.fields[2].value = comment;
      recruitment.fields[3].value = contact;

      interaction.editReply({ content: '@everyone', embeds: [recruitment] });
    } catch (err) {
      console.error(`Error while running command 'recrutamento':\n${err}`);
    }
  }
};