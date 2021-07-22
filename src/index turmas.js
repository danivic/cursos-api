const { v4 } = require('uuid');
const express = require('express');
const {turmas} = require('./turmas');
const app = express();

app.use(express.json());

app.get('/turmas/search', (request, response) => {
    const {name} = request.query;
    const results = name
    ? turmas.filter(t => t.name.includes(name))
    :turmas;
    return response.status(200).json(results);
});

app.get('/turmas', (request, response) => {
    return response.status(200).json(turmas);
});

app.post('/turmas', (request, response) => {
    const {type, name} = request.body;
    const turma = { 
        id:v4(), 
        type: type, 
        name: name 
    }
    turmas.push(turma);
    return response.status(201).json(turma);
});

app.put('/turmas/:id', (request, response) => {
    const {id} = request.params;
    const {type, name} = request.body;
    const index = turmas.findIndex(t => t.id === id);
    if(index < 0) return response.status(404).json({error: 'Não encontrado'});
    const turma = { id, type, name};
    turmas[index] = turma;
        return response.status(200).json(turma);
});

app.delete('/turmas/:id', (request, response) => {
    const {id} = request.params;
    const index = turmas.findIndex(t => t.id === id);
    if(index < 0) 
    return response.status(404).json({error: 'Não encontrado'});
    turmas.splice(index, 1);
    return response.status(200).json({Message: 'turma removida'});
});


app.listen(3333);