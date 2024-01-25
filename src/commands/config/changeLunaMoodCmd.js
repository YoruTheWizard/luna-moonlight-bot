const { SlashCommandBuilder, Client } = require('discord.js');
const changeLunaMood = require('../../utils/changeLunaMood');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('humordaluna')
    .setDescription('[Dev] Modifica o humor da Luna')
    .addStringOption(opt => opt
      .setName('estado')
      .setDescription('Estado de humor da Luna')
      .addChoices(
        { name: 'Feliz', value: 'happy' },
        { name: 'Triste', value: 'sad' },
        { name: 'Irritada', value: 'mad' }
      )
      .setRequired(true)
    )
    .addUserOption(opt => opt
      .setName('pessoa-gatilho')
      .setDescription('Pessoa que desencadeou o humor')
    )
    .addBooleanOption(opt => opt
      .setName('permanente')
      .setDescription('Se o humor pode ser facilmente reversível')
    )
  ,

  options: {
    devOnly: true
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
      newMoodTrigger = interaction.options.get('pessoa-gatilho')?.value,
      permanent = interaction.options.get('permanente')?.value;

    const triggerUser = interaction.guild.members.cache.get(newMoodTrigger);
    if (newMoodTrigger && !triggerUser) {
      interaction.reply({ content: 'Esse usuário não existe!', ephemeral: true });
      return;
    }

    const moodResponse = changeLunaMood(newMoodState, triggerUser, permanent);
    interaction.reply({ content: moodResponse, ephemeral: true });
  }
};