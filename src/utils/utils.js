const { GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle, Role, Interaction, CacheType } = require('discord.js');
const { mood } = require('../config.json');
const scanTitles = require('../json/scanTitles.json');
const emojis = require('../json/emojis.json');
const family = require('../json/family.json');
const pdfLinks = require('../json/titlePdfLinks.json');

/**
 * 
 * @returns {{name: string, value: string}[]}
 */
const getTitlesChoices = () => {
  const choices = [];
  for (let title of scanTitles) {
    choices.push({ name: title.name, value: title.id });
  }
  return choices;
};

/**
 * 
 * @param {SlashCommandStringOption} opt
 * @returns {SlashCommandStringOption}
 */
const setCommandTitleOption = opt => {
  opt.setName('obra')
    .setDescription('Nome da obra')
    .setRequired(true);
  const titles = getTitlesChoices();
  for (let title of titles)
    opt.addChoices(title);
  return opt;
};

const setPDFCommandTitleOption = opt => {
  opt.setName('obra')
    .setDescription('Nome da obra')
    .setRequired(true);
  for (let title of pdfLinks)
    opt.addChoices({
      name: title.titleName,
      value: title.titleId
    });
  return opt;
};

/**
 * 
 * @param {string} msg 
 * @param {boolean} allowNumbers 
 * @returns string
 */
const messageTreater = (msg, allowNumbers) => {
  if (allowNumbers)
    return msg.content.toLowerCase().replace(/[^a-z0-9áàãâéêíóõôúñ]/g, '');
  return msg.content.toLowerCase().replace(/[^a-záàãâéêíóõôúñ]/g, '');
};

/**
 * 
 * @param {string} listText 
 * @returns string
 */
const listTreater = listText => {
  const list = listText.split(', ');
  return '- '.concat(list.join('\n- '));
};

/**
 * 
 * @param {string} linksText 
 * @returns {{num: number, name: string, url: string, emoji?:string}[]} 
 */
const linkListTreater = linksText => {
  if (!linksText) return;
  const links = [],
    splitLinks = linksText.split(', ');
  for (let i = 0; i < splitLinks.length; i++) {
    let link = splitLinks[i].split(' ');
    let linkObj = {
      num: i + 1,
      name: link[1] ? link[1].replace(/-/g, ' ') : null,
      url: link[0],
    };

    if (link[2])
      linkObj.emoji = link[2].replace(/[^0-9]/g, '');

    links.push(linkObj);
  }
  return links;
};

/**
 * 
 * @param {{ num: number, name: string, url: string, emoji?: string }[]} links 
 * @returns ActionRowBuilder
 */
const linkButtonsRow = links => {
  const row = new ActionRowBuilder();
  for (let link of links) {
    let btn =
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(link.name)
        .setURL(link.url);
    if (link.emoji) btn.setEmoji(link.emoji);
    row.components.push(btn);
  }
  return row;
};

/**
 * 
 * @param {string} preText 
 * @param {GuildMember} member 
 * @param {string | undefined} postText 
 * @returns string
 */
const messageAuthorFilter = (preText, member, postText = '!') => {
  let person;
  for (let familyMember of family)
    if (member.id === familyMember.id) {
      if (preText === 'Olá') preText = 'Oi';
      person = familyMember.name;
    }

  if (!person) person = member.displayName;

  return checkMood(`${preText}, **${person}**${postText}`, member);
};

/**
 * 
 * @returns {{
 *  state: 'happy' | 'sad' | 'mad',
 *  trigger: string | null,
 *  isPermanent: boolean
 * }}
 */
const getLunaMood = () => {
  return mood;
};

/**
 * 
 * @param {string} text 
 * @param {GuildMember} member 
 * @returns string
 */
const checkMood = (text, member) => {
  const { state, trigger } = mood;
  let alteredText = '';

  if (trigger) // Check for trigger
    if (member.id === trigger) // Check if message sender is the trigger
      switch (state) {
        case 'sad': alteredText = `${emojis.crisis}\n`; break;
        case 'mad': alteredText = emojis.puff; return alteredText;
      }

  if (state === 'sad') {
    alteredText = alteredText.concat(`*${text}*`.replace(/[\.,!]/g, '...'));
    return alteredText;
  }
  if (state === 'mad') {
    alteredText = alteredText.concat(text.replace('!', '').replace(/\*\*/g, '***'));
    return alteredText;
  }
  return alteredText.concat(text);
};

/**
 * 
 * @param {Interaction<CacheType>} interaction
 * @param {{
 *  embeds: EmbedBuilder[],
 *  ephemeral: boolean,
 *  rows?: ActionRowBuilder[],
 *  role?: Role | "@deleted-role" | "@everyone",
 * }} options
 * 
 * @returns {Promise<void>}
 */
const sendEmbeds = async (interaction, { embeds, ephemeral, role, rows }) => {
  if (!role) role = '@everyone';
  if (ephemeral) {
    await interaction.channel.send({ content: `${role}`, embeds, components: rows });
    interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
  } else interaction.reply({ content: `${role}`, embeds, components: rows });
};

/**
 * 
 * @param {string} commandName 
 * @param {string} errMessage 
 */
const errorLogger = (commandName, errMessage) => {
  console.error(`Error while running command "${commandName}":\n${errMessage}`);
};

module.exports = {
  getTitlesChoices,
  setCommandTitleOption,
  setPDFCommandTitleOption,
  messageTreater,
  listTreater,
  linkListTreater,
  linkButtonsRow,
  messageAuthorFilter,
  getLunaMood,
  checkMood,
  sendEmbeds,
  errorLogger
};
