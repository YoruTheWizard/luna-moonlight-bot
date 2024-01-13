const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require("discord.js");
const { getTitlesChoices, linkListTreater, errorLogger, sendEmbeds, linkButtonsRow } = require('../../../utils/utils');

module.exports = {
  staffOnly: true,
  data: {
    name: 'novolancamento',
    description: '[Staff] Manda um anúncio para todos no servidor sobre um novo capítulo.',
    options: [
      {
        name: 'obra',
        description: 'Nome da obra',
        type: ApplicationCommandOptionType.String,
        choices: getTitlesChoices(),
        required: true
      },
      {
        name: 'tipo',
        description: 'Tipo de lançamento',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'Capítulo',
            value: 'capítulo'
          },
          {
            name: 'Volume',
            value: 'volume'
          }
        ],
        required: true
      },
      {
        name: 'numero',
        description: 'Número do capítulo / volume',
        type: ApplicationCommandOptionType.Number,
        required: true
      },
      {
        name: 'link',
        description: 'Link para ler o lançamento',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'descricao',
        description: 'Descrição do lançamento',
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'imagem',
        description: 'Imagem do lançamento',
        type: ApplicationCommandOptionType.Attachment
      },
      {
        name: 'imagem-link',
        description: 'Link da imagem do lançamento',
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
      type = interaction.options.get('tipo').value,
      number = interaction.options.get('numero').value,
      titleDescription = interaction.options.get('descricao')?.value,
      titleLinks = linkListTreater(interaction.options.get('link').value),
      image = interaction.options.getAttachment('imagem')
        || interaction.options.get('imagem-link')?.value
        || null;

    const scanTitles = require('../../../json/scanTitles.json');
    let titleObj;
    for (let title of scanTitles)
      if (title.id === titleName) titleObj = title;

    try {
      const newReleaseEmbed = new EmbedBuilder()
        .setColor(titleObj.color)
        .setAuthor({ name: titleObj.longNameJP || titleObj.longName })
        .setTitle(`Novo ${type} de ${titleObj.name}!`)
        .setDescription(
          `O ${type} **${number}** já está disponível! Venha ver!<${titleObj.emoji || ':tada:'}>`
        );

      if (titleDescription)
        newReleaseEmbed.addFields({ name: 'Descrição', value: titleDescription });
      // newReleaseEmbed.addFields({ name: 'Links', value: links });

      if (image)
        newReleaseEmbed.setImage(image?.url ? image.url : image);

      const role = interaction.guild.roles.cache.get(titleObj.fanRole);
      const buttons = linkButtonsRow(titleLinks);

      await sendEmbeds({
        interaction,
        embeds: [newReleaseEmbed],
        ephemeral: true,
        role: role ? role : '@deleted-role',
        rows: [buttons]
      });

    } catch (err) {
      errorLogger('novolancamento', err);
    }
  }
};