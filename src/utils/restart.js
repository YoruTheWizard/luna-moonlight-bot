const { Client, Channel } = require("discord.js");
const start = require("..");

/**
 * 
 * @param {Channel} channel
 * @param {Client} client 
 */
module.exports = async (channel, client) => {
  try {
    console.log('Restarting...');
    channel.send('Reiniciando...')
      .then(msg => client.destroy())
      .then(() => start())
      .then(msg => console.log('Restarted successfully'));
  } catch (err) {
    console.error(`Error while restarting application:\n${err}`);
  };
};
