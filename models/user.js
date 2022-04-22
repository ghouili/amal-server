const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{type: String, required: true, unique: true },
    nom:{type: String, required: true},
    prenom:{type: String, required: true},
    adress:{type: String, required: true},
    tel:{type: Number, required: true},
    type:{type: String, required: true},
    sexe:{type: String, required: true},
    password:{type: String, required: true},
    birthdate:{type: String, required: true},
    avatar:{type: String,},
    posts: [{ type: mongoose.Types.ObjectId, ref: 'post' }],
})

module.exports = mongoose.model('user', UserSchema);