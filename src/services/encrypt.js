const bcrypt = require('bcrypt');
const bcryptRounds = process.env.BCRYPT_ROUNDS || 12;

module.exports = {
    hash: async password => bcrypt.hash(password, bcryptRounds),
    compare: async (password, encrypted) => bcrypt.compare(password, encrypted)
};