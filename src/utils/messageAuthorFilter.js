const { GuildMember } = require('discord.js');
const { family } = require('../config.json');
const emojis = require('../json/emojis.json');

/**
 * 
 * @param {string} preText 
 * @param {GuildMember} member 
 * @param {string | undefined} postText 
 */
module.exports = (preText, member, postText = '!') => {
  let person;
  if (family.includes(member.id)) {
    if (preText === 'Olá') preText = 'Oi';
    switch (member.id) {
      case family[0]:
        preText = emojis.crisis.concat(`\n${preText}`);
        person = 'pai';
        postText = '...';
        break;
      case family[1]: person = 'tio Del'; break;
      case family[2]: person = 'tio Jeff';
    }
  } else person = member.displayName;

  return `${preText}, **${person}**${postText}`;
};