const mongoose = require('../services/mongoose');
const encrypt = require('../services/encrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[a-zA-Z]{4,20}/.test(value),
            message: 'Invalid username'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
            message: 'Invalid email address'
        }
    },
    admin: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre('save', async function(next) {
    // Criptografa a senha e gera o token de autenticação
    try{
        const hash = await encrypt.hash(this.password);
        this.password = hash;
        next();
    }
    catch(error){
        console.log(error);
        throw error;
    }
    
});

module.exports = mongoose.model('User', userSchema);

