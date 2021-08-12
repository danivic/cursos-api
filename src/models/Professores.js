const mongoose = require('mongoose');

const Professores = new mongoose.Schema({
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

mongoose.model('professores', Professores);