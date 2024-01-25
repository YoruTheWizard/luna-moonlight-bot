const { Client, Interaction, ApplicationCommandOptionType } = require("discord.js");
const ms = require('ms');
const { errorLogger } = require('../../utils/utils');

module.exports = {
  data: {
    name: 'castigo',
    description: '[ADM] Silencia um membro por um tempo determinado',
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
      {
        name: 'usuario-alvo',
        description: 'O usuário a ser castigado',
        required: true,
        type: ApplicationCommandOptionType.Mentionable
      },
      {
        name: 'duracao',
        description: 'Duração do castigo (30m, 1h, 1 day).',
        required: true,
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'razao',
        description: 'Razão do castigo',
        type: ApplicationCommandOptionType.String
      }
    ],
  },
  options: {
    userPermissions: ['MuteMembers'],
    botPermissions: ['MuteMembers']
  },

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0
   */
  run: async ({ interaction, client }) => {
    const mentionable = interaction.options.get('usuario-alvo').value;
    const duracao = interaction.options.get('duracao').value
      .replace('dia', 'day')
      .replace('dias', 'days');
    const razao = interaction.options.get('razao')?.value || 'Nenhuma razão providenciada';

    await interaction.deferReply();
    const targetUser = await interaction.guild.members.fetch(mentionable);
    if (!targetUser) {
      await interaction.editReply({ content: 'Esse usuário não existe!', ephemeral: true });
      return;
    }
    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply({ content: 'Esse usuário não pode ser banido pois é o dono do servidor!', ephemeral: true });
      return;
    }
    if (targetUser.user.bot) {
      await interaction.editReply({ content: 'Não é possível castigar um bot!', ephemeral: true });
      return;
    }

    const msDuratrion = ms(duracao);
    if (isNaN(msDuratrion)) {
      await interaction.editReply({ content: 'Duração do castigo inválida!', ephemeral: true });
      return;
    }
    if (msDuratrion < 5000 || msDuratrion > 2.419e9) {
      await interaction.editReply({ content: 'A duração do castigo deve estar entre 5 segundos e 28 dias!', ephemeral: true });
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
      await interaction.editReply({ content: 'Eu não posso banir esse usuário pois possui mesmo cargo ou um cargo maior que o meu!', ephemeral: true });
      return;
    }

    // Timeout the user
    try {
      const { default: prettyMs } = await import('pretty-ms');
      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(msDuratrion, razao);
        await interaction.editReply(`O castigo de ${targetUser} foi modificado para ${prettyMs(msDuratrion, { verbose: true })
          .replace('second', 'segundo')
          .replace('seconds', 'segundos')
          .replace('minute', 'minuto')
          .replace('minutes', 'minutos')
          .replace('hour', 'hora')
          .replace('hours', 'horas')
          .replace('day', 'dia')
          .replace('days', 'dias')}`);
        return;
      }

      await targetUser.timeout(msDuratrion, razao);
      await interaction.editReply(`${targetUser} foi silenciado por ${prettyMs(msDuratrion, { verbose: true })
        .replace('second', 'segundo')
        .replace('seconds', 'segundos')
        .replace('minute', 'minuto')
        .replace('minutes', 'minutos')
        .replace('hour', 'hora')
        .replace('hours', 'horas')
        .replace('day', 'dia')
        .replace('days', 'dias')}.\nRazão: ${razao}`);
    } catch (err) {
      errorLogger('castigo', err);
    }
  }
};