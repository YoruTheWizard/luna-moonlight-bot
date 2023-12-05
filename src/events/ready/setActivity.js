const { Client, ActivityType } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */
module.exports = client => {
  client.user.setActivity({
    name: 'Talking to the moon - Bruno Mars',
    type: ActivityType.Listening
  });
};