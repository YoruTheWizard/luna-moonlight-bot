const fs = require('fs');
const path = require('path');
const { User } = require('discord.js');
const filePath = path.join(__dirname, '..', 'config.json');

/**
 * 
 * @param {'happy' | 'sad' | 'mad'} newMood 
 * @param {User} [newTrigger] 
 * 
 * @returns {string}
 */
module.exports = (newMood, newTrigger) => {
  const config = require('../config.json');
  const { state, trigger } = config.mood;
  if (newMood === state && ((!newTrigger && !trigger) || newTrigger?.id === trigger))
    return 'Já tenho esse humor!';

  let response, respMood;
  switch (newMood) {
    case 'happy': respMood = 'feliz'; break;
    case 'sad': respMood = 'triste'; break;
    case 'mad': respMood = 'irritada'; break;
  }

  config.mood.state = newMood;
  if (newTrigger) {
    config.mood.trigger = newTrigger.id;
    response = `Humor alterado para **${respMood}**. Pessoa-gatilho: **${newTrigger.username}**`;
  }
  else {
    config.mood.trigger = null;
    response = `Humor alterado para **${respMood}**.`;
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
    console.log(`Mood changed to "${newMood}". Trigger: ${newTrigger?.username || 'none'}`);
    return response;
  } catch (err) {
    console.log(`Error while overwriting mood in config.json:\n${err}`);
  }
}; 