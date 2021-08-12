const mongoose = require('mongoose');

const Cursos = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

mongoose.model('cursos', Cursos);