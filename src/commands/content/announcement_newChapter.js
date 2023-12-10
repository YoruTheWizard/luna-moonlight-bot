const { ApplicationCommandOptionType, Client, Interaction } = require("discord.js");
const { testServer } = require('../../config.json');
const newChapterEmbed = require('../../embeds/newChapterEmbed.json');
const scanTitles = require('../../json/scanTitles.json');

module.exports = {
  devOnly: false,
  testOnly: false,
  deleted: false,

  name: 'novocapitulo',
  description: 'Manda um anúncio para todos no servidor sobre um novo capítulo.',
  options: [
    {
      name: 'obra',
      description: 'Nome da obra',
      type: ApplicationCommandOptionType.String,
      choices: [],
      required: true
    },
    {
      name: 'capitulo',
      description: 'Número do capítulo',
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
      titleChapter = interaction.options.get('capitulo').value,
      titleDescription = interaction.options.get('descricao')?.value,
      titleURL = interaction.options.get('link').value;

    let titleObj;
    for (let title of scanTitles)
      if (title.id === titleName) titleObj = title;

    await interaction.deferReply();

    newChapterEmbed.color = parseInt(titleObj.color);
    newChapterEmbed.author.name = newChapterEmbed.author.name
      .replace('{title}', titleObj.longNameJP || titleObj.longName);
    newChapterEmbed.title = newChapterEmbed.title.replace('{title}', titleObj.name);
    newChapterEmbed.description = newChapterEmbed.description
      .replace('{chapter}', titleChapter)
      .replace('{emoji}', titleObj.emoji ? titleObj.emoji : ':tada:');
    if (titleDescription)
      newChapterEmbed.fields[0].value = newChapterEmbed.fields[0].value.replace('{description}', titleDescription);
    newChapterEmbed.fields[1].value = titleURL;

    await interaction.editReply({ content: `<@&${titleObj.fanRole}>`, embeds: [newChapterEmbed] });
  }
};