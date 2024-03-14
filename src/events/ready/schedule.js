const { Client } = require("discord.js");
const cron = require('node-cron');

/**
 * 
 * @param {Client} client 
 */
module.exports = client => {
  const gm = require('../../config.json').goodMorning;
  const guild = client.guilds.cache.get(gm.server);
  const channel = guild.channels.cache.get(gm.channel);
  cron.schedule(gm.cronString, () => {
    setTimeout(() => channel.sendTyping(), gm.typingCooldown);
    setTimeout(() => channel.send(gm.msg), gm.typingCooldown * 2);
  });
};
