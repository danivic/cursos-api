const { v4 } = require('uuid');
const express = require('express');
const {alunos} = require('./alunos');
const app = express();

app.use(express.json());

app.get('/alunos/search', (request, response) => {
    const {name} = request.query;
    const results = name
    ? alunos.filter(a => a.name.includes(name))
    :alunos;
    return response.status(200).json(results);
});

app.get('/alunos', (request, response) => {
    return response.status(200).json(alunos);
});

app.post('/alunos', (request, response) => {
    const {type, name} = request.body;
    const aluno = { 
        id:v4(), 
        type: type, 
        name: name 
    }
    alunos.push(aluno);
    return response.status(201).json(aluno);
});

app.put('/alunos/:id', (request, response) => {
    const {id} = request.params;
    const {type, name} = request.body;
    const index = alunos.findIndex(a => a.id === id);
    if(index < 0) return response.status(404).json({error: 'Não encontrado'});
    const aluno = { id, type, name};
    alunos[index] = aluno;
        return response.status(200).json(aluno);
});

app.delete('/alunos/:id', (request, response) => {
    const {id} = request.params;
    const index = alunos.findIndex(a => a.id === id);
    if(index < 0) 
    return response.status(404).json({error: 'Não encontrado'});
    alunos.splice(index, 1);
    return response.status(200).json({Message: 'Aluno removido'});
});


app.listen(3333);