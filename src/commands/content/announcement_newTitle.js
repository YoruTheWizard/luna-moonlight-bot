const fs = require('fs');
const path = require('path');
const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require('discord.js');
const { testServer } = require('../../config.json');

module.exports = {
  devOnly: false,
  testOnly: false,
  deleted: false,

  name: 'novaobra',
  description: 'Manda um anúncio para todos no servidor sobre uma nova obra',
  options: [
    {
      name: 'nome',
      description: 'Nome da obra',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'link',
      description: 'Link para ler a obra',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'link-imagem',
      description: 'Link para uma imagem da obra',
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

    const titleName = interaction.options.get('nome').value,
      titleURL = interaction.options.get('link').value,
      titleImageURL = interaction.options.get('link-imagem').value,
      sinopsys = (interaction.options.get('sinopse')?.value
        || 'Nenhuma sinopse providenciada'),
      comment = (interaction.options.get('comantario')?.value
        || 'Sem comentário');

    await interaction.deferReply();

    try {
      const filePath = path.join(__dirname, '..', '..', 'embeds', 'newTitleEmbed.json');
      const newTitle = require(filePath);

      newTitle.author.name = interaction.member.displayName;
      newTitle.author.icon_url = interaction.member.displayAvatarURL();
      newTitle.title = newTitle.title.replace('{guildName}', interaction.guild.name);
      newTitle.description = newTitle.description.replace('{titleName}', titleName);
      newTitle.fields[0].value = sinopsys;
      newTitle.fields[1].value = comment;
      newTitle.fields[2].value = titleURL;
      newTitle.image.url = titleImageURL;

      interaction.editReply({ content: '@everyone', embeds: [newTitle] });
    } catch (err) {
      console.error(`Error while running command 'novocapitulo':\n${err}`);
    }
  }
};