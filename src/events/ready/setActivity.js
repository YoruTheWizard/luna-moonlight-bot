const { Client, ActivityType } = require("discord.js");
const { activity } = require('../../config.json');

/**
 * 
 * @param {Client} client 
 */
module.exports = client => {
  if (!activity.type) return;
  const name = activity.text;
  let type;
  switch (activity.type) {
    case 'playing': type = ActivityType.Playing; break;
    case 'watching': type = ActivityType.Watching; break;
    case 'listening': type = ActivityType.Listening; break;
    case 'streaming': type = ActivityType.Streaming;
  }
  client.user.setActivity({ name, type });
};