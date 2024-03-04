const fs = require('fs');
const path = require('path');
const { Client } = require("discord.js");
const configPath = path.join(__dirname, '..', 'config.json');
const { errorLogger } = require("./utils");
const restart = require("./restart");

/**
 * 
 * @param {import("discord.js").Interaction} interaction 
 * @param {Client} client 
 */
const setActivity = (interaction, client) => {
  const type = interaction.options.get('tipo').value,
    text = interaction.options.get('texto').value,
    config = require(configPath);

  config.activity = { text, type };

  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('Edited config.json');
    restart(interaction.channel, client);
    interaction.reply({
      content: `Atividade alterada para "**${type}** ${text}"`,
      ephemeral: true
    });
  } catch (err) {
    errorLogger('activity configure', err);
  }
};

/**
 * 
 * @param {import("discord.js").Interaction} interaction
 * @param {Client} client 
 */
const clearActivity = (interaction, client) => {
  const config = require(configPath);
  config.activity = {
    text: '',
    type: ''
  };
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('Edited config.json');
    restart(interaction.channel, client);
    interaction.reply({ content: 'Atividade apagada.', ephemeral: true });
  } catch (err) {
    errorLogger('activity clear', err);
  }
};

module.exports = {
  setActivity,
  clearActivity
};
