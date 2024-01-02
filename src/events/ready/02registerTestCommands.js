const { testServer } = require('../../config.json');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const addTitlesToCommandChoices = require('../../utils/addTitlesToCommandChoices');

module.exports = async client => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, testServer);

    for (const command of localCommands) {
      const { name, description } = command;
      let { options } = command;
      const existingCommand = await applicationCommands.cache.find(
        cmd => cmd.name === name
      );
      if (existingCommand) {
        if (command.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`[Test] Deleted command "${name}".`);
          continue;
        }

        if (!command.testOnly) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`[Test] Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, command)) {
          if (name === 'novolancamento' || name === 'recrutamento') continue;
          await applicationCommands.edit(existingCommand.id, {
            description,
            options
          });
          console.log(`[Test] Edited existing command "${name}"`);
        }
      } else {
        if (!command.testOnly) continue;
        if (command.deleted) {
          console.log(`[Test] Skipping registring command "${name}" as it was set to delete.`);
          continue;
        }

        if (name === 'novolancamento' || name === 'recrutamento') {
          options = addTitlesToCommandChoices(options);
          console.log(`[Test] Added choices to "${name}" command.`);
        }

        await applicationCommands.create({
          name, description, options
        });
        console.log(`[Test] Registered command "${name}".`);
      }
    }
  } catch (e) {
    console.log(`[Test] Error while trying to register slash commands: \n${e}`);
  }
};