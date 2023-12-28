const { Client } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {string | undefined} guildId 
 * @returns GuildApplicationCommandManager | ApplicationCommandManager<ApplicationCommand<{ guild: GuildResolvable; }>, { guild: GuildResolvable; }, null>
 */
module.exports = async (client, guildId) => {
  let applicationCommands;
  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    applicationCommands = client.application.commands;
  }

  await applicationCommands.fetch();
  return applicationCommands;
};