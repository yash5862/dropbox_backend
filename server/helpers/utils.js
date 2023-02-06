const messages = require('../helpers/constants/message');
const crypto = require('crypto');
const key = 'dRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t';
const algorithm = 'aes-256-ctr';
const IV = '+KbPeShVkYp3s6v9';

const generateUUID = (length = 4, options = { numericOnly: false }) => {
  let text = '';
  const possible =
    options && options.numericOnly ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const encrypt = (text) => {
  const cipher = crypto.createDecipheriv(algorithm, key, IV);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, key, IV);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports = {
  messages, generateUUID, encrypt, decrypt
};
