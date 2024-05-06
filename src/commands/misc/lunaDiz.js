const { SlashCommandBuilder } = require("discord.js");
const { SlashCommandProps } = require('commandkit');
const { errorLogger } = require("../../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lunadiz')
    .setDescription('[Yoru] Luna diz algo...')
    .addStringOption(opt => opt
      .setName('mensagem')
      .setDescription('Mensagem da Luna')
      .setRequired(true)
    )
    .addStringOption(opt => opt
      .setName('responder')
      .setDescription('Id da mensagem para responder')
    ),

  options: {
    ownerOnly: true,
  },

  /**
   * 
   * @param {SlashCommandProps} param0 
   */
  run: async ({ interaction, client }) => {
    const msg = interaction.options.getString('mensagem', true);
    const replyId = interaction.options.getString('responder');

    try {
      let replyMsg;
      if (replyId) replyMsg = await interaction.channel.messages.fetch(replyId);

      interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
      if (replyMsg) replyMsg.reply(msg);
      else interaction.channel.send(msg);
    } catch (err) {
      errorLogger('lunadiz', err);
    }
  }
};
