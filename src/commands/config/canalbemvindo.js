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
  }
};

/**
 * 
 * @param {Interaction} interaction
 */
const welcomeDisable = async (interaction) => {
  try {
    await interaction.deferReply();
    const disabled = configWelcomeChannel.disable(interaction.guild.id);
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
    const newChannelId = interaction.options.get('canal').value;
    const newChannel = await interaction.guild.channels.fetch(newChannelId);
    await interaction.deferReply();

    if (!newChannel) {
      await interaction.editReply('Esse canal não existe!');
      return;
    }

    const channelRegistered = await configWelcomeChannel.register(
      interaction.guild.id,
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
        `Mensagens de bem-vindo habilitadas para este servidor.\nCanal de mensagens de bem-vindo configurado para #${newChannel.name}.`
      );
    }

    await interaction.editReply(
      `Canal de mensagens de bem-vindo realocado para #${newChannel.name}.`
    );
  } catch (err) {
    errorLogger('mensagembemvindo configurar', err);
  }
};