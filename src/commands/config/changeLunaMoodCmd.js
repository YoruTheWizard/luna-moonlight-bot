const { ApplicationCommandOptionType, Client } = require('discord.js');
const changeLunaMood = require('../../utils/changeLunaMood');

module.exports = {
  devOnly: true,
  testOnly: false,
  data: {
    name: 'humordaluna',
    description: 'Modifica o humor da Luna',
    options: [
      {
        name: 'estado',
        description: 'Estado de humor da Luna',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'Feliz',
            value: 'happy'
          },
          {
            name: 'Triste',
            value: 'sad'
          },
          {
            name: 'Irritada',
            value: 'mad'
          },
        ],
        required: true,
      },
      {
        name: 'pessoa-gatilho',
        description: 'Pessoa que desencadeou o humor',
        type: ApplicationCommandOptionType.Mentionable
      }
    ]
  },

  /**
   * 
   * @param {{
   *  interaction: import('discord.js').Interaction,
   *  client: Client
   * }} param0 
   */
  run: ({ interaction, client }) => {
    const newMoodState = interaction.options.get('estado').value,
      newMoodTrigger = interaction.options.get('pessoa-gatilho')?.value;

    const triggerUser = client.users.cache.get(newMoodTrigger);
    if (newMoodTrigger && !triggerUser) {
      interaction.reply({ content: 'Esse usuário não existe!', ephemeral: true });
      return;
    }

    const moodResponse = changeLunaMood(newMoodState, triggerUser);
    interaction.reply({ content: moodResponse, ephemeral: true });
  }
};