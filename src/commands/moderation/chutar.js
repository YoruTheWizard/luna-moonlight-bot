const { ApplicationCommandOptionType, Client } = require("discord.js");
const { errorLogger } = require('../../utils/utils');

module.exports = {
  data: {
    name: 'chutar',
    description: '[ADM] Chuta um membro para fora do servidor',
    devOnly: false,
    testOnly: false,
    options: [
      {
        name: 'usuario-alvo',
        description: 'O usuário a ser chutado',
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
      },
      {
        name: 'razao',
        description: 'A razão pela qual foi chutado',
        type: ApplicationCommandOptionType.String
      }
    ],
  },

  options: {
    userPermissions: ['KickMembers'],
    botPermissions: ['KickMembers'],
  },

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0
   */
  run: async ({ interaction, client }) => {
    const targetUserId = interaction.options.get('usuario-alvo').value;
    const reason = interaction.options.get('razao')?.value || 'Nenhuma razão providenciada';
    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);
    if (!targetUser) {
      await interaction.editReply({ content: 'Esse usuário não existe!', ephemeral: true });
      return;
    }
    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply({ content: 'Esse usuário não pode ser chutado pois é o dono do servidor!', ephemeral: true });
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the command
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot
    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply({ content: 'Você não pode chutar esse usuário pois possui mesmo cargo ou um cargo maior que o seu!', ephemeral: true });
      return;
    }
    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply({ content: 'Eu não posso chutar esse usuário pois possui o mesmo cargo/um cargo maior que o meu!', ephemeral: true });
      return;
    }

    // Kick the target user
    try {
      await targetUser.kick({ reason });
      await interaction.editReply(`Usuário ${targetUser} foi chutado para fora do servidor.\nRazão: ${reason}`);
    } catch (err) {
      errorLogger('chutar', err);
    }
  }
};