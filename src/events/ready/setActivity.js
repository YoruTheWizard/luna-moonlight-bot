const { Client, ActivityType } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */
module.exports = client => {
  client.user.setActivity({
    name: 'de castigo... ;-;',
    type: ActivityType.Playing
  });
};