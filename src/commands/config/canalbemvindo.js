const { ApplicationCommandOptionType, PermissionFlagsBits, Client, Interaction } = require("discord.js");
const registerServerWelcomeChannel = require("../../utils/registerServerWelcomeChannel");

module.exports = {
  devOnly: false,
  testOnly: false,
  deleted: false,

  name: 'canalbemvindo',
  description: '[ADM] Configura um canal para serem enviadas as mensagens de bem-vindo e adeus',
  options: [
    {
      name: 'canal',
      description: 'Canal onde serão enviadas as mensagens de bem-vindo',
      type: ApplicationCommandOptionType.Channel,
      required: true
    },
  ],
  permissionsRequired: PermissionFlagsBits.Administrator,
  botPermissions: PermissionFlagsBits.Administrator,

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    try {
      const newChannelId = interaction.options.get('canal').value;
      const newChannel = await interaction.guild.channels.fetch(newChannelId);
      await interaction.deferReply();

      if (!newChannel) {
        await interaction.editReply('Esse canal não existe!');
        return;
      }

      const channelRegistered = await registerServerWelcomeChannel(
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
          `Mensagens de bem-vindo habilitadas para este servidor.
          Canal de mensagens de bem-vindo configurado para #${newChannel.name}.`
        );
      }

      await interaction.editReply(
        `Canal de mensagens de bem-vindo realocado para #${newChannel.name}.`
      );
    } catch (err) {
      console.error(`Error while running command 'canalbemvindo': \n${err}`);
    }
  }
};