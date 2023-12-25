const { ApplicationCommandOptionType, PermissionFlagsBits, Client } = require("discord.js");

module.exports = {
  name: 'banir',
  description: '[ADM] Bane um membro do servidor',
  devOnly: false,
  testOnly: false,
  options: [
    {
      name: 'usuario-alvo',
      description: 'O usuário a ser banido',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'razao',
      description: 'A razão do banimento',
      type: ApplicationCommandOptionType.String
    }
  ],
  deleted: false,
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],

  /**
   * 
   * @param {Client} client 
   * @param {Intersection} interaction 
   */

  callback: async (client, interaction) => {
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
      console.error(`There was an error while running the command 'ban': \n${err}`);
    }
  }
};