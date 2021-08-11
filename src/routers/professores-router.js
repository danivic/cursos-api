const { v4 } = require('uuid');
const express = require('express');
const {professores} = require('../professores');
const app = express();

app.use(express.json());

app.get('/professores/search', (request, response) => {
    const {name} = request.query;
    const results = name
    ? professores.filter(p => p.name.includes(name))
    :professores;
    return response.status(200).json(results);
});

app.get('/professores', (request, response) => {
    return response.status(200).json(professores);
});

app.post('/professores', (request, response) => {
    const {type, name} = request.body;
    const professor = { 
        id:v4(), 
        type: type, 
        name: name 
    }
    professores.push(professor);
    return response.status(201).json(professor);
});

app.put('/professores/:id', (request, response) => {
    const {id} = request.params;
    const {type, name} = request.body;
    const index = professores.findIndex(p => p.id === id);
    if(index < 0) return response.status(404).json({error: 'Não encontrado'});
    const professor = { id, type, name};
    professores[index] = professor;
        return response.status(200).json(professor);
});

app.delete('/professores/:id', (request, response) => {
    const {id} = request.params;
    const index = professores.findIndex(p => p.id === id);
    if(index < 0) 
    return response.status(404).json({error: 'Não encontrado'});
    professores.splice(index, 1);
    return response.status(200).json({Message: 'Professor removido'});
});


app.listen(3333);