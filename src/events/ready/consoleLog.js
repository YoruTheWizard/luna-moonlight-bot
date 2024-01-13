const { getLunaMood } = require('../../utils/utils');

module.exports = client => {
  console.log(`${client.user.tag} is currently online.`);
  console.log(`Mood: "${getLunaMood().state}".`);
};