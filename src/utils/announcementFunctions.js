const { Client, EmbedBuilder } = require("discord.js");
const { linkListTreater, errorLogger, sendEmbeds, linkButtonsRow } = require('./utils');

/**
 * 
 * @param {{
 *  interaction: import("discord.js").Interaction,
 *  client: Client
 * }} param0 
 * @returns {Promise<void>}
 */
const newRelease = async ({ interaction, client }) => {
  const titleName = interaction.options.get('obra').value,
    type = interaction.options.get('tipo').value,
    number = interaction.options.get('numero').value,
    titleLinks = linkListTreater(interaction.options.get('link').value),
    volume = interaction.options.get('volume')?.value,
    titleDescription = interaction.options.get('descricao')?.value,
    image = interaction.options.getAttachment('imagem')
      || interaction.options.get('imagem-link')?.value
      || null;

  if (!titleLinks[0].name) {
    interaction.reply({ content: '*Opa!* Parece que você mandou os links do jeito errado!\nTente escrever os links no modelo: *"link.com Nome-do-link emoji"*.\nOs emojis não são obrigatórios.', ephemeral: true });
    return;
  }

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
        `O ${type} **${number}**${volume ? ` do volume *${volume}*` : ''} já está disponível! Venha ver!<${titleObj.emoji || ':tada:'}>`
      );

    if (titleDescription)
      newReleaseEmbed.addFields({ name: 'Descrição', value: titleDescription });
    // newReleaseEmbed.addFields({ name: 'Links', value: links });

    if (image)
      newReleaseEmbed.setImage(image?.url ? image.url : image);

    const role = interaction.channel.guild.roles.cache.get(titleObj.fanRole);
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
};

/**
 * 
 * @param {{
 *  interaction: Interaction,
 *  client: Client
 * }} param0 
 * @returns {Promise<void>}
 */
const newTitle = async ({ interaction, client }) => {
  const titleName = interaction.options.get('nome').value,
    titleLinks = linkListTreater(interaction.options.get('links').value),
    titleImage = interaction.options.getAttachment('imagem')
      || interaction.options.get('url-imagem')?.value,
    sinopsys = interaction.options.get('sinopse')?.value,
    comment = interaction.options.get('comentario')?.value;

  if (!titleLinks[0].name) {
    interaction.reply({ content: '*Opa!* Parece que você mandou os links do jeito errado!\nTente escrever os links no modelo: *"link.com Nome-do-link emoji"*.\nOs emojis não são obrigatórios.', ephemeral: true });
    return;
  }

  try {
    const newTitle = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL()
      })
      .setTitle(`Nova obra chegando na Moonlight!`)
      .setDescription(`Nome: **${titleName}**`);
    // .addFields({ name: 'Links', value: links });

    if (sinopsys)
      newTitle.addFields({ name: 'Sinopse', value: sinopsys });

    if (comment)
      newTitle.addFields({ name: 'Comentário', value: comment });

    if (titleImage)
      newTitle.setImage(titleImage?.url ? titleImage.url : titleImage);

    const buttons = linkButtonsRow(titleLinks);

    await sendEmbeds({
      interaction,
      embeds: [newTitle],
      ephemeral: true,
      rows: [buttons]
    });
    // interaction.channel.send({ content: '@everyone', embeds: [newTitle] });
    // interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
  } catch (err) {
    errorLogger('novaobra', err);
  }
};

/**
 * 
 * @param {{
 *  interaction: Interaction,
 *  client: Client
 * }} param0 
 * @returns {Promise<void>}
 */
const recruitment = async ({ interaction, client }) => {
  const titleName = interaction.options.get('obra').value,
    roles = listTreater(interaction.options.get('cargos').value),
    requirements = listTreater(interaction.options.get('requisitos').value),
    comment = interaction.options.get('comentario')?.value,
    contact = interaction.options.get('contato')?.value;

  const scanTitles = require('../../../json/scanTitles.json');
  let titleObj;
  for (let title of scanTitles)
    if (title.id === titleName) {
      titleObj = title;
      break;
    }

  try {
    const recruitmentEmbed = new EmbedBuilder()
      .setColor(titleObj.color)
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL()
      })
      .setTitle('Estamos recrutando!')
      .setDescription(`<@${interaction.member.id}> está solicitando membros para axuiliarem em **${titleObj.name}**.`)
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
      );

    if (comment)
      recruitment.addFields({ name: 'Mais informações', value: comment });

    recruitment.addFields({
      name: 'Contato',
      value: contact || `Mande uma mensagem para **${interaction.member.displayName}** pelo privado do discord!`
    });

    await sendEmbeds({
      interaction,
      embeds: [recruitmentEmbed],
      ephemeral: true
    });
    // interaction.channel.send({ content: '@everyone', embeds: [recruitment] });
    // interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
  } catch (err) {
    errorLogger('recrutamento', err);
  }
};

module.exports = {
  newRelease,
  newTitle,
  recruitment
};