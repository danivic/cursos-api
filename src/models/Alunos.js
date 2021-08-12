const mongoose = require('mongoose');

const Alunos = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

mongoose.model('alunos', Alunos);