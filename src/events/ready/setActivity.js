const { Client, ActivityType } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */
module.exports = client => {
  client.user.setActivity({
    name: 'Amo meu papaizinho! 💜',
    type: ActivityType.Playing
  });
};