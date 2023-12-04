const { testServer } = require('../../../config.json');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

module.exports = async client => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, testServer);

    for (const command of localCommands) {
      const { name, description, options } = command;
      const existingCommand = await applicationCommands.cache.find(
        cmd => cmd.name === name
      );
      if (existingCommand) {
        if (command.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, command)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options
          });
          console.log(`Edited existing command "${name}"`);
        }
      } else {
        if (command.deleted) {
          console.log(`Skipping registring command "${name}" as it was set to delete.`);
          continue;
        }

        await applicationCommands.create({
          name, description, options
        });
        console.log(`Registered command "${name}".`);
      }
    }
  } catch (e) {
    console.log(`Error while trying to register slash commands: \n${e}`);
  }
};