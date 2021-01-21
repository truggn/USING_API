const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const login = new Schema({
    email: { type: String, default: ''},
    password: { type: String, default: ''},
    loginAt: { type: Date, default: Date.now},
    logoutAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},
    tokens:[{
        token: {
            type: String,
            require: true
        }
    }],

    login: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, { collection: 'login' })

// login.index({ first: 1, last: -1 }) Nơi đánh index
module.exports = mongoose.model('login', login)