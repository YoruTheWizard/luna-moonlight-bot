const { SlashCommandBuilder, Client, Interaction } = require("discord.js");
const configWelcomeChannel = require("../../utils/ConfigWelcomeChannel");

const { errorLogger } = require('../../utils/utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mensagembemvindo')
    .setDescription('[ADM] Mensagens de bem-vindo e adeus')
    .addSubcommand(sub => sub
      .setName('configurar')
      .setDescription('[ADM] Configura um canal para serem enviadas as mensagens de "bem-vindo" e "adeus"')
      .addChannelOption(opt => opt
        .setName('canal')
        .setDescription('Canal onde serão enviadas as mensagens de bem-vindo')
        .setRequired(true)
      )
    )
    .addSubcommand(sub => sub
      .setName('desabilitar')
      .setDescription('[ADM] Desabilita mensagens de bem-vindo e adeus no servidor')
    )
    .addSubcommand(sub => sub
      .setName('info')
      .setDescription('[ADM] Mostra informações sobre mensagens de bem-vindo e adeus no servidor')
    ),
  options: {
    userPermissions: ['Administrator'],
    botPermissions: ['Administrator']
  },

  /**
   * 
   * @param {{
   *  interaction: Interaction,
   *  client: Client
   * }} param0 
   */
  run: async ({ interaction, client }) => {
    const sub = interaction.options.getSubcommand();
    if (sub === 'configurar') welcomeConfig(interaction);
    else if (sub === 'desabilitar') welcomeDisable(interaction);
    else if (sub === 'info') welcomeInfo(interaction);
  }
};

/**
 * 
 * @param {Interaction} interaction
 */
const welcomeDisable = async (interaction) => {
  try {
    await interaction.deferReply();
    const guild = interaction.member.guild;
    const disabled = configWelcomeChannel.disable(guild.id);
    if (!disabled) {
      interaction.editReply({ content: 'As mensagens de bem-vindo não estão habilitadas neste servidor!', ephemeral: true });
      return;
    }

    interaction.editReply('Mensagens de bem-vindo desabilitadas neste servidor.');
  } catch (err) {
    errorLogger('mensagembemvindo desabilitar', err);
  }
};

/**
 * 
 * @param {Interaction} interaction
 */
const welcomeConfig = async (interaction) => {
  try {
    const guild = interaction.member.guild;
    const newChannelId = interaction.options.get('canal').value;
    const newChannel = await guild.channels.fetch(newChannelId);
    await interaction.deferReply();

    if (!newChannel) {
      await interaction.editReply('Esse canal não existe!');
      return;
    }

    const channelRegistered = await configWelcomeChannel.register(
      guild.id,
      newChannelId
    );

    if (channelRegistered.channelExists) {
      await interaction.editReply({
        content: 'Esse canal já está configurado para mandar as mensagens!',
        ephemeral: true
      });
      return;
    }

    if (!channelRegistered.serverExists) {
      await interaction.editReply(
        `Mensagens de bem-vindo habilitadas para este servidor.\nCanal de mensagens de bem-vindo configurado para ${newChannel}.`
      );
    }

    await interaction.editReply(
      `Canal de mensagens de bem-vindo realocado para ${newChannel}.`
    );
  } catch (err) {
    errorLogger('mensagembemvindo configurar', err);
  }
};

/**
 * 
 * @param {Interaction} interaction
 */
const welcomeInfo = (interaction) => {
  const guild = interaction.member.guild;
  const channelId = configWelcomeChannel.info(guild.id);

  if (!channelId) {
    interaction.reply('As mensagens de bem-vindo não estão habilitadas neste servidor.');
    return;
  }

  const channel = guild.channels.cache.get(channelId);
  interaction.reply(`Servidor: ${guild.name}\nCanal: ${channel}`);
};