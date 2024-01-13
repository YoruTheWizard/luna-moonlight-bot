const { GuildMember } = require('discord.js');
const { family } = require('../config.json');
const scanTitles = require('../json/scanTitles.json');
const emojis = require('../json/emojis.json');

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
      name: link[1].replace('-', ' '),
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
 * @param {string} preText 
 * @param {GuildMember} member 
 * @param {string | undefined} postText 
 * @returns string
 */
const messageAuthorFilter = (preText, member, postText = '!') => {
  let person;
  if (family.includes(member.id)) {
    if (preText === 'Olá') preText = 'Oi';
    switch (member.id) {
      case family[0]: person = 'pai'; break;
      case family[1]: person = 'tio Del'; break;
      case family[2]: person = 'tio Jeff'; break;
      case family[3]: person = 'Cadu onii-san';
    }
  } else person = member.displayName;
  console.log(member.id);
  return `${preText}, **${person}**${postText}`;
};

module.exports = {
  getTitlesChoices,
  listTreater,
  linkListTreater,
  messageTreater,
  messageAuthorFilter
};