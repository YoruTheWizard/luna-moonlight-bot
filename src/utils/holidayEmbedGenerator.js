const { EmbedBuilder } = require('discord.js');
const { stars } = require('../json/emojis.json');
const { ny } = require('../json/speech.json');

const getNewYearsEmbed = () => {
  const newYearsEmbed = new EmbedBuilder()
    .setColor('White')
    .setTitle('Feliz ano novo!')
    .setDescription(`Que a lua esteja com vocês nesse ${new Date().getFullYear() + 1}! ${stars}`)
    .setFields([
      {
        name: '\u200B',
        value: ny[1]
      },
      {
        name: '\u200B',
        value: ny[2]
      },
      {
        name: '\u200B',
        value: ny[3]
      },
      {
        name: '\u200B',
        value: ny[4]
      },
      {
        name: '\u200B',
        value: ny[5]
      },
    ])
    .setImage('https://cdn.discordapp.com/attachments/1179205182232465411/1190989655768834068/82_Sem_Titulo_20231223214757.png?ex=65a3ce8d&is=6591598d&hm=fca52aa4e5b98d3b1d37ff8cd1545b269c0be4a98206df57f619ec31c1d37a80&');
  return newYearsEmbed;
};

const getChristmasEmbed = () => {
  const christmasEmbed = new EmbedBuilder();
  return christmasEmbed;
};

const getEasterEmbed = () => {
  const easterEmbed = new EmbedBuilder();
  return easterEmbed;
};

module.exports = {
  getNewYearsEmbed,
  getChristmasEmbed,
  getEasterEmbed
};