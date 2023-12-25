/**
 * 
 * @param {string} listText 
 */
module.exports = listText => {
  const list = listText.split(', ');
  return '- '.concat(list.join('\n- '));
};