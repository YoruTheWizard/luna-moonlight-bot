const scanTitles = require('../json/scanTitles.json');

module.exports = options => {
  for (let title of scanTitles) {
    options[0].choices.push({ name: title.name, value: title.id });
  }
  return options;
};