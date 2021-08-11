const { v4 } = require('uuid');
const express = require('express');
const {cursos} = require('../cursos');
const app = express();

app.use(express.json());

app.get('/cursos/search', (request, response) => {
    const {name} = request.query;
    const results = name
    ? cursos.filter(c => c.name.includes(name))
    :cursos;
    return response.status(200).json(results);
});

app.get('/cursos', (request, response) => {
    return response.status(200).json(cursos);
});

app.post('/cursos', (request, response) => {
    const {type, name} = request.body;
    const curso = { 
        id:v4(), 
        type: type, 
        name: name 
    }
    cursos.push(curso);
    return response.status(201).json(curso);
});

app.put('/cursos/:id', (request, response) => {
    const {id} = request.params;
    const {type, name} = request.body;
    const index = cursos.findIndex(c => c.id === id);
    if(index < 0) return response.status(404).json({error: 'Não encontrado'});
    const curso = { id, type, name};
    cursos[index] = curso;
        return response.status(200).json(curso);
});

app.delete('/cursos/:id', (request, response) => {
    const {id} = request.params;
    const index = cursos.findIndex(c => c.id === id);
    if(index < 0) 
    return response.status(404).json({error: 'Não encontrado'});
    cursos.splice(index, 1);
    return response.status(200).json({Message: 'Curso removido'});
});


app.listen(3333);