const { GuildMember } = require('discord.js');
const { family } = require('../config.json');

/**
 * 
 * @param {string} preText 
 * @param {GuildMember} member 
 * @param {string | undefined} postText 
 */
module.exports = (preText, member, postText = '!') => {
  let person;
  if (member.id === family[0]) person = 'pai';
  else if (member.id === family[1]) person = 'tio Del';
  else if (member.id === family[2]) person = 'tio Jeff';
  else person = member.displayName;

  return `${preText}, **${person}**${postText}`;
};