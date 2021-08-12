const express = require('express');
const cors = require('cors');
const app = express.Router();
const mongoose = require('mongoose');
app.use(express.json());


require('../models/Cursos');
const Cursos = mongoose.model('cursos');

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

app.get('/cursos/:id', (request, response) => {
    Cursos.findOne({ _id: request.params.id }).then((cursos) => {
        return response.json(cursos);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhum curso encontrado!"
        })
    })
});

app.get('/cursos', (request, response) => {
   /*  return response.status(400).json({
        error: true,
        message: "Nenhum dado encontrado!"
    })
}); */

    Cursos.find({}).then((cursos) => {
        return response.json(cursos);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhum curso encontrado!"
        })
    })
});

app.post('/cursos', (request, response) => {
    //console.log(response.body);
    //return response.json(request.body);
    const cursos = Cursos.create(request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: o curso não foi cadastrado!"
        })

        return response.status(400).json({
            error: false,
            message: "Curso cadastrado com sucesso!"
        })
    })
});

app.put('/cursos/:id', (request, response) => {
    const cursos = Cursos.updateOne({ _id: request.params.id }, request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: O curso não foi alterado!"
        });

        return response.json({
            error: false,
            message: "Curso alterado com sucesso!"
        });
    });
});

app.delete('/cursos/:id', (request, response) => {
    const cursos = Cursos.deleteOne({_id: request.params.id}, (erro) => {
        if(erro) return response.status(400).json({
            error: true,
            message: "Error: O aluno não foi removido!"
        });

        return response.json({
            error: false,
            message: "Curso removido com sucesso!"
        });
    });
});


module.exports = app