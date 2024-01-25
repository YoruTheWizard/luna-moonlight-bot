const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '..', 'config.json');
const config = require('../config.json');

const register = (server, channel) => {
  const response = { serverExists: true, channelExists: false };
  if (config.welcomeOn.filter(e => e.server === server).length > 0) {
    for (let e of config.welcomeOn) {
      if (e.server === server) {
        if (e.channel === channel) response.channelExists = true;

        e.channel = channel;
      }
    }
  } else {
    response.serverExists = false;
    config.welcomeOn.push({ server, channel });
  }

  if (!(response.serverExists && response.channelExists))
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  return response;
};

const disable = (server) => {
  if (config.welcomeOn.filter(e => e.server === server).length === 0)
    return false;

  config.welcomeOn = config.welcomeOn.filter(e => e.server !== server);

  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  return true;
};

module.exports = {
  register,
  disable
};