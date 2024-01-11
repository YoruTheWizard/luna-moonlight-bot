const { ApplicationCommandOptionType, Client, Interaction } = require('discord.js');

module.exports = {
  data: {
    name: 'opiniaodaluna',
    description: 'Manda aleatoriamente um adjetivo para alguém do servidor',
    options: [
      {
        name: 'pessoa',
        description: 'O objeto do adjetivo',
        type: ApplicationCommandOptionType.Mentionable
      }
    ],
  },

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

    let rand = parseInt(Math.random() * adj.length);

    const { family } = require('../../../config.json');
    if (family.includes(personId))
      while (adj[rand].adj === 'nada' || adj[rand].bad)
        rand = parseInt(Math.random() * (adj.length));

    if (adj[rand].adj === 'nada') {
      interaction.editReply(`Não tenho muito a dizer sobre ${person.displayName}`);
      return;
    }

    interaction.editReply(`Eu acho que ${person.displayName} é ${adj[rand].adj}`);
  }
};