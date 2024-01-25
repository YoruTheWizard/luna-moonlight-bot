const { SlashCommandBuilder, Client, Interaction } = require('discord.js');
const { getLunaMood } = require('../../../utils/utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('opiniaodaluna')
    .setDescription('Manda aleatoriamente um adjetivo para alguém do servidor')
    .addUserOption(opt => opt
      .setName('pessoa')
      .setDescription('A pessoa para dar opinião')
    ),

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0  
   */
  run: async ({ interaction, client }) => {
    const adj = require('../../../json/adjectives.json'),
      personId = interaction.options.get('pessoa')?.value || interaction.member.id;
    const person = await interaction.guild.members.fetch(personId);

    await interaction.deferReply();

    if (personId === interaction.guild.members.me.id) {
      interaction.editReply('Eu gosto de mim mesma');
      return;
    }

    const mood = getLunaMood();
    let rand = parseInt(Math.random() * adj.length), isFamily = false;

    const family = require('../../../json/family.json');
    for (let member of family)
      if (interaction.member.id === member.id)
        isFamily = true;
    if (mood.state === 'happy' && isFamily)
      while (adj[rand].adj === 'nada' || adj[rand].bad)
        rand = parseInt(Math.random() * (adj.length));

    if (mood.state === 'mad') {
      while (adj[rand].adj === 'nada' || !adj[rand].bad)
        rand = parseInt(Math.random() * (adj.length));
    }

    if (adj[rand].adj === 'nada') {
      interaction.editReply(`Não tenho muito a dizer sobre ${person.displayName}`);
      return;
    }

    interaction.editReply(`Eu acho que ${person.displayName} é ${adj[rand].adj}`);
  }
};