const express = require('express');
const cors = require('cors');
const app = express.Router();
const mongoose = require('mongoose');
app.use(express.json());


require('../models/Alunos');
const Alunos = mongoose.model('alunos');

app.use((request, response, next) => {
    //console.log("Acessou o Middleware!");
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/cursos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});

app.get('/alunos/:id', (request, response) => {
    Alunos.findOne({ _id: request.params.id }).then((alunos) => {
        return response.json(alunos);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhum aluno encontrado!"
        })
    })
});

app.get('/alunos', (request, response) => {
   /*  return response.status(400).json({
        error: true,
        message: "Nenhum dado encontrado!"
    })
}); */

    Alunos.find({}).then((alunos) => {
        return response.json(alunos);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhum aluno encontrado!"
        })
    })
});

app.post('/alunos', (request, response) => {
    //console.log(response.body);
    //return response.json(request.body);
    const alunos = Alunos.create(request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: o aluno não foi cadastrado!"
        })

        return response.status(400).json({
            error: false,
            message: "Aluno cadastrado com sucesso!"
        })
    })
});

app.put('/alunos/:id', (request, response) => {
    const alunos = Alunos.updateOne({ _id: request.params.id }, request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: O aluno não foi alterado!"
        });

        return response.json({
            error: false,
            message: "Aluno alterado com sucesso!"
        });
    });
});

app.delete('/alunos/:id', (request, response) => {
    const alunos = Alunos.deleteOne({_id: request.params.id}, (erro) => {
        if(erro) return response.status(400).json({
            error: true,
            message: "Error: O aluno não foi removido!"
        });

        return response.json({
            error: false,
            message: "Aluno removido com sucesso!"
        });
    });
});


module.exports = app