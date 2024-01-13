const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require('discord.js');
const { linkListTreater, errorLogger, sendEmbeds } = require('../../../utils/utils');

module.exports = {
  staffOnly: true,
  data: {
    name: 'novaobra',
    description: '[Staff] Manda um anúncio para todos no servidor sobre uma nova obra',
    options: [
      {
        name: 'nome',
        description: 'Nome da obra',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'links',
        description: 'Links para ler a obra',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'sinopse',
        description: 'A sinopse da obra',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'comentario',
        description: 'Algum comentário sobre a obra',
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'imagem',
        description: 'Arquivo de uma imagem da obra',
        type: ApplicationCommandOptionType.Attachment
      },
      {
        name: 'link-imagem',
        description: 'URL de uma imagem da obra',
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
    const titleName = interaction.options.get('nome').value,
      titleLinks = linkListTreater(interaction.options.get('links').value),
      titleImage = interaction.options.getAttachment('imagem')
        || interaction.options.get('url-imagem')?.value,
      sinopsys = interaction.options.get('sinopse')?.value,
      comment = interaction.options.get('comentario')?.value;

    const linksArray = [];
    for (let link of titleLinks) linksArray.push(`[${link.name}](${link.url})`);
    let links = '- '.concat(linksArray.join('\n- '));

    try {
      const newTitle = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({
          name: interaction.member.displayName,
          iconURL: interaction.member.displayAvatarURL()
        })
        .setTitle(`Nova obra chegando na Moonlight!`)
        .setDescription(`Nome: **${titleName}**`)
        .addFields({ name: 'Links', value: links });

      if (sinopsys)
        newTitle.addFields({ name: 'Sinopse', value: sinopsys });

      if (comment)
        newTitle.addFields({ name: 'Comentário', value: comment });

      if (titleImage)
        newTitle.setImage(titleImage?.url ? titleImage.url : titleImage);

      await sendEmbeds({
        interaction,
        embeds: [newTitle],
        ephemeral: true,
      });
      // interaction.channel.send({ content: '@everyone', embeds: [newTitle] });
      // interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
    } catch (err) {
      errorLogger('novaobra', err);
    }
  }
};