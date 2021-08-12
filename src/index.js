const express = require('express');
const sequelize = require('sequelize');
const cors = require('cors');
const alunosRouter = require('./routers/alunos-router')
const professoresRouter = require('./routers/professores-router')
const cursosRouter = require('./routers/cursos-router')
const turmasRouter = require('./routers/turmas-router')
const porta = 3333
const app = express();
app.use(express.json());

/* app.get('/', (request, response) => {
    return response.status(200).send('Bem-Vindos')
}); */

/* require('./models/alunos');
const Alunos = sequelize.model('alunos'); */

app.use((request, response, next) => {
    //console.log("Acessou o Middleware!");
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});

/* sequelize.connect('mssql://localhost/progsis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conexão com mssql realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com mssql não foi realizada com sucesso!");
}); */

app.use('/', alunosRouter, professoresRouter, cursosRouter, turmasRouter)

app.listen(porta);