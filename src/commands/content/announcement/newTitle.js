const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require('discord.js');
const { linkListTreater } = require('../../../utils/utils');

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
        || interaction.options.get('url-imagem').value,
      sinopsys = (interaction.options.get('sinopse')?.value
        || 'Nenhuma sinopse providenciada'),
      comment = (interaction.options.get('comentario')?.value
        || 'Sem comentário');

    const linksArray = [];
    for (let link of titleLinks) linksArray.push(`[${link.name}](${link.url})`);
    let links = '- '.concat(linksURL.join('\n- '));

    try {
      const newTitle = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({
          name: interaction.member.displayName,
          iconURL: interaction.member.displayAvatarURL()
        })
        .setTitle(`Nova obra chegando na Moonlight!`)
        .setDescription(`Nome: **${titleName}**`)
        .addFields(
          {
            name: 'Sinopse',
            value: sinopsys
          },
          {
            name: 'Comentário',
            value: comment
          },
          {
            name: 'Links',
            value: links
          }
        );

      if (titleImage)
        newTitle.setImage(titleImage?.url ? titleImage.url : titleImage);

      interaction.channel.send({ content: '@everyone', embeds: [newTitle] });
      interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
    } catch (err) {
      console.error(`Error while running command 'novocapitulo':\n${err}`);
    }
  }
};