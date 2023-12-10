const { Client, Interaction } = require('discord.js');
const { testServer, devs } = require('../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const localCommands = getLocalCommands();
  try {
    const commandObj = localCommands.find(cmd => cmd.name === interaction.commandName);
    if (!commandObj) return;
    if (commandObj.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Este comando só pode ser usado por desenvolvedores!',
          ephremeral: true
        });
        return;
      }
    }

    if (commandObj.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: 'Este comando não pode ser executado neste servidor!',
          ephremeral: true
        });
        return;
      }
    }

    if (commandObj.permissionsRequired?.length) {
      for (const permission of commandObj.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Você não possui permissões suficientes!',
            ephremeral: true
          });
          return;
        }
      }
    }

    if (commandObj.botPermissions?.length) {
      for (const permission of commandObj.botPermissions) {
        const bot = interaction.guild.members.me;
        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "Eu não possuo permissões suficientes!",
            ephremeral: true
          });
          return;
        }
      }
    }

    await commandObj.callback(client, interaction);
  } catch (err) {
    console.error(`Error while running command: \n${err}`);
  }
};