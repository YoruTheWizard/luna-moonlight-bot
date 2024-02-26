const { SlashCommandBuilder, Client, Interaction } = require('discord.js');
const { authors } = require('../../json/scanBloopers.json');

const setAuthorOption = opt => {
  opt.setName('autor')
    .setDescription('O autor da pérola');
  for (let author of authors)
    opt.addChoices({ name: author, value: author });
  return opt;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('perolasdoservidor')
    .setDescription('Manda aleatoriamente uma pérola do servidor')
    .addStringOption(opt => setAuthorOption(opt)),

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0
   */
  run: async ({ interaction, client }) => {
    const authorFilter = interaction.options.get('autor')?.value;

    let rand, blooper;
    const { bloopers } = require('../../json/scanBloopers.json');
    do {
      rand = parseInt(Math.random() * bloopers.length);
      blooper = bloopers[rand];
    } while (authorFilter && blooper.author !== authorFilter);

    interaction.reply(`"${blooper.message}" ~ ${blooper.authorName}. ${blooper.date}`);
  }
};