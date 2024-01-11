const fs = require('fs');
const path = require('path');
const { ApplicationCommandOptionType, Client, Interaction, EmbedBuilder } = require('discord.js');
const { testServer, staff } = require('../../config.json');
const listTreater = require('../../utils/listTreater');

module.exports = {
  devOnly: false,
  testOnly: false,
  deleted: false,

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
      name: 'url-imagem',
      description: 'URL de uma imagem da obra',
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
      if (!interaction.member.roles.cache.some(role => role.id === staff)) interaction.reply({
        content: 'Apenas membros da staff podem usar este comando!',
        ephemeral: true
      });

    const titleName = interaction.options.get('nome').value,
      titleURL = interaction.options.get('links').value,
      titleImageURL = interaction.options.get('url-imagem').value,
      sinopsys = (interaction.options.get('sinopse')?.value
        || 'Nenhuma sinopse providenciada'),
      comment = (interaction.options.get('comentario')?.value
        || 'Sem comentário');

    const links = listTreater(titleURL);

    try {
      // const filePath = path.join(__dirname, '..', '..', 'embeds', 'newTitleEmbed.json');
      // const newTitle = require(filePath);
      const newTitle = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({
          name: interaction.member.displayName,
          iconURL: interaction.member.displayAvatarURL()
        })
        .setTitle(`Nova obra chegando na Moonlight!`)
        .setDescription(`Nome: ${titleName}`)
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
        )
        .setImage(titleImageURL);

      // newTitle.author.name = interaction.member.displayName;
      // newTitle.author.icon_url = interaction.member.displayAvatarURL();
      // newTitle.title = newTitle.title.replace('{guildName}', interaction.guild.name);
      // newTitle.description = newTitle.description.replace('{titleName}', titleName);
      // newTitle.fields[0].value = sinopsys;
      // newTitle.fields[1].value = comment;
      // newTitle.fields[2].value = titleURL;
      // newTitle.image.url = titleImageURL;

      interaction.channel.send({ content: '@everyone', embeds: [newTitle] });
      interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
    } catch (err) {
      console.error(`Error while running command 'novocapitulo':\n${err}`);
    }
  }
};