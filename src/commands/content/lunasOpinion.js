const { ApplicationCommandOptionType, Client, Interaction } = require('discord.js');

module.exports = {
  devOnly: false,
  testOnly: false,
  deleted: false,

  name: 'opiniaodaluna',
  description: 'Manda aleatoriamente um adjetivo para alguém do servidor',
  options: [
    {
      name: 'pessoa',
      description: 'O objeto do adjetivo',
      type: ApplicationCommandOptionType.Mentionable
    }
  ],

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    const adj = require('../../json/adjectives.json'),
      personId = interaction.options.get('pessoa')?.value || interaction.member.id;
    const person = await interaction.guild.members.fetch(personId);

    await interaction.deferReply();
    let rand = parseInt(Math.random() * (adj.length + 1));
    if (person.user.tag === 'argamerbr1300'
      || person.user.tag === '_delvalle'
      || person.user.tag === 'jfee_')
      while (rand === adj.length + 1 || adj[rand].bad)
        rand = parseInt(Math.random() * (adj.length));

    let reply;
    if (rand === adj.length + 1) reply = `Não tenho muito a dizer sobre ${person.displayName}`;
    else reply = `Eu acho que ${person.displayName} é ${adj[rand].adj}`;
    interaction.editReply(reply);
  }
};