const express = require('express');
const alunosRouter = require('./routers/alunos-router')
const porta = 3333
const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    return response.status(200).send('Bem-Vindos')
});

app.use('/', alunosRouter)

app.listen(porta);