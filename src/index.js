const express = require('express');
const alunosRouter = require('./alunos-router')
const porta = 3333
const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    return response.status(200).send('Bem-Vindos')
});

app.use('/api', alunosRouter)

app.listen(porta);