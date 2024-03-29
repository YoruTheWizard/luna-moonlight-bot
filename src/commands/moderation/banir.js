const { SlashCommandBuilder, Client } = require("discord.js");
const { errorLogger } = require('../../utils/utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banir')
    .setDescription('[ADM] Bane um membro do servidor')
    .addUserOption(opt => opt
      .setName('usuario-alvo')
      .setDescription('O usuário a ser banido')
      .setRequired(true)
    )
    .addStringOption(opt => opt
      .setName('razao')
      .setDescription('A razão do banimento')
    ),

  options: {
    userPermissions: ['BanMembers'],
    botPermissions: ['BanMembers']
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
      await interaction.editReply({ content: 'Esse usuário não pode ser banido pois é o dono do servidor!', ephemeral: true });
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the command
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot
    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply({ content: 'Você não pode banir esse usuário pois possui mesmo cargo ou um cargo maior que o seu!', ephemeral: true });
      return;
    }
    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply({ content: 'Eu não posso banir esse usuário pois possui o mesmo cargo/um cargo maior que o meu!', ephemeral: true });
      return;
    }

    // Ban the target user
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(`Usuário ${targetUser} foi banido.\nRazão: ${reason}`);
    } catch (err) {
      errorLogger('banir', err);
    }
  }
};