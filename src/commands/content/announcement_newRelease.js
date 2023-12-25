const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require("discord.js");
const { testServer } = require('../../config.json');
const scanTitles = require('../../json/scanTitles.json');
// const newChapterEmbed = require('../../embeds/newChapterEmbed.json');

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
      description: 'Link para ler o capítulo',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'descricao',
      description: 'Descrição do capítulo',
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
      if (!interaction.member.roles.cache.some(role => role.id === '1123264880800182352')) interaction.reply({
        content: 'Apenas membros da staff podem usar este comando!',
        ephemeral: true
      });
    const titleName = interaction.options.get('obra').value,
      type = interaction.options.get('tipo').value,
      number = interaction.options.get('numero').value,
      titleDescription = interaction.options.get('descricao')?.value,
      titleLinks = interaction.options.get('link').value.split(', ');

    let links = '- '.concat(titleLinks.join('\n- '));

    let titleObj;
    for (let title of scanTitles)
      if (title.id === titleName) titleObj = title;

    try {
      const newChapterEmbed = new EmbedBuilder()
        .setColor(titleObj.color)
        .setAuthor({ name: titleObj.longNameJP || titleObj.longName })
        .setTitle(`Novo ${type} de ${titleObj.name}!`)
        .setDescription(
          `O ${type} **${number}** já está disponível! Venha ver!<${titleObj.emoji || ':tada:'}>`
        );

      if (titleDescription)
        newChapterEmbed.addFields({ name: 'Descrição', value: titleDescription });
      newChapterEmbed.addFields({ name: 'Links', value: links });

      await interaction.channel.send({ content: `<@&${titleObj.fanRole}>`, embeds: [newChapterEmbed] });
      interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
    } catch (err) {
      console.error(`Error while running command 'novolancamento': \n${err}`);
    }
  }
};