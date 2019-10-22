const jwt = require('jsonwebtoken');
const jwtHash = process.env.JWT_HASH;

module.exports = {
    'getToken': (object) => {
        if(jwtHash){
            return jwt.sign(object, jwtHash, {});
        }
        else{
            throw {error: "You must provide a JWT_HASH inside src/.env file"}
        }
    },
    'verify': (token) => {
        return jwt.verify(token, jwtHash, {});
    }
}