const { testServer, staff } = require('../config.json');

module.exports = ({ interaction, commandObj }) => {
  if (interaction.guildId = testServer) return false;
  if (commandObj.staffOnly) if (!interaction.member.roles.cache.get(staff)) {
    interaction.reply({
      content: 'Este comando só pode ser utilizado por membros da staff!',
      ephemeral: true
    });
    return true;
  }
};