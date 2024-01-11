const { devs } = require('../config.json');

module.exports = (interaction, commandObj) => {
  if (commandObj.devOnly) if (!devs.includes(interaction.member.id)) {
    interaction.reply({
      content: 'Este comando só pode ser utilizado por desenvolvedores!',
      ephemeral: true
    });
    return true;
  }
};