const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require("discord.js");
const { testServer, staff } = require('../../config.json');
// const newReleaseEmbed = require('../../embeds/newReleaseEmbed.json');

module.exports = {
  devOnly: false,
  testOnly: false,
  deleted: false,

  name: 'novolancamento',
  description: '[Staff] Manda um anúncio para todos no servidor sobre um novo capítulo.',
  options: [
    {
      name: 'obra',
      description: 'Nome da obra',
      type: ApplicationCommandOptionType.String,
      choices: [],
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
  // permissionsRequired: PermissionFlagsBits.Administrator,
  // botPermissions: PermissionFlagsBits.Administrator,

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    if (interaction.guild.id !== testServer)
      if (!interaction.member.roles.cache.some(role => role.id === staff)) interaction.reply({
        content: 'Apenas membros da staff podem usar este comando!',
        ephemeral: true
      });
    const titleName = interaction.options.get('obra').value,
      type = interaction.options.get('tipo').value,
      number = interaction.options.get('numero').value,
      titleDescription = interaction.options.get('descricao')?.value,
      titleLinks = interaction.options.get('link').value.split(', '),
      image = interaction.options.getAttachment('imagem')
        || interaction.options.get('imagem-link')?.value
        || null;

    let links = '- '.concat(titleLinks.join('\n- '));

    const scanTitles = require('../../json/scanTitles.json');
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
      newReleaseEmbed.addFields({ name: 'Links', value: links });

      if (image)
        newReleaseEmbed.setImage(image?.url ? image.url : image);

      await interaction.channel.send({ content: `<@&${titleObj.fanRole}>`, embeds: [newReleaseEmbed] });
      interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
    } catch (err) {
      console.error(`Error while running command 'novolancamento': \n${err}`);
    }
  }
};