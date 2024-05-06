const { devs } = require('../config.json');

/**
 * 
 * @param {import("commandkit").ValidationProps} param0 
 */
module.exports = ({ interaction, commandObj }) => {
  if (commandObj.options?.ownerOnly) {
    if (interaction.member.id !== devs[0]) {
      interaction.reply({
        content: 'Apenas o **Yoru** pode utilizar este comando!',
        ephemeral: true,
      });
      return true;
    }
  }
};
