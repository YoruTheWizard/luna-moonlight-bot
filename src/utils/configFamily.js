const fs = require('fs');
const path = require('path');
const { errorLogger } = require("./utils");
const filePath = path.join(__dirname, '..', 'json', 'family.json');

/**
 * 
 * @param {string} userId 
 * @param {string} nickname 
 * @returns {void}
 */
const addFamily = (userId, nickname) => {
  const family = require(filePath);
  family.push({ name: nickname, id: userId });
  try {
    fs.writeFileSync(filePath, JSON.stringify(family, null, 2));
    console.log('Added family member');
    return;
  } catch (err) {
    errorLogger('family add', err);
  }
};

/**
 * 
 * @param {string} userId 
 * @returns {string}
 */
const removeFamily = (userId) => {
  const family = require(filePath);
  let member, newList = [];
  for (m of family) {
    if (m.id === userId) member = m;
    else newList.push(m);
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(newList, null, 2));
    console.log('Removed family member');
    return member.name;
  } catch (err) {
    errorLogger('family add', err);
  }
};

module.exports = {
  addFamily,
  removeFamily
};
