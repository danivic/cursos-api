const mongoose = require('mongoose');

const Turmas = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

mongoose.model('turmas', Turmas);