const express = require('express')

const alunosRouter = express.Router()

alunosRouter.get('/alunos', (request, response) => {
    response.send('lista todos os alunos')
})

module.exports = alunosRouter