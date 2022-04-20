const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    texte:{type: String,},
    image:{type: String, },
    file:{type: String, },
    date:{type: String, required: true},
    time:{type: String, required: true},
    iduser:{ type: mongoose.Types.ObjectId, required: true, ref: 'user' },
})

module.exports = mongoose.model('post', postSchema);