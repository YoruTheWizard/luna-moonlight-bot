const { testServer } = require('../config.json');

module.exports = (interaction, commandObj) => {
  if (commandObj.testOnly) if (interaction.guildId !== testServer) {
    interaction.reply({
      content: 'Este comando não pode ser utilizado neste servidor!',
      ephemeral: true
    });
    return true;
  }
};