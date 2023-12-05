/**
 * 
 * @param {string} msg 
 */
module.exports = msg => {
  return msg.content.toLowerCase().replace(/[^a-zA-Z0-9áéíóúàãõñ ]/g, '');
};