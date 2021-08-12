const express = require('express');
const cors = require('cors');
const app = express.Router();
const mongoose = require('mongoose');
app.use(express.json());


require('../models/Turmas');
const Turmas = mongoose.model('turmas');

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

app.get('/turmas/:id', (request, response) => {
    Turmas.findOne({ _id: request.params.id }).then((turmas) => {
        return response.json(turmas);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhuma turma encontrada!"
        })
    })
});

app.get('/turmas', (request, response) => {
   /*  return response.status(400).json({
        error: true,
        message: "Nenhum dado encontrado!"
    })
}); */

    Turmas.find({}).then((turmas) => {
        return response.json(turmas);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhuma turma encontrada!"
        })
    })
});

app.post('/turmas', (request, response) => {
    //console.log(response.body);
    //return response.json(request.body);
    const turmas = Turmas.create(request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: a turma não foi cadastrada!"
        })

        return response.status(400).json({
            error: false,
            message: "Turma cadastrada com sucesso!"
        })
    })
});

app.put('/turmas/:id', (request, response) => {
    const turmas = Turmas.updateOne({ _id: request.params.id }, request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: A turma não foi alterada!"
        });

        return response.json({
            error: false,
            message: "Turma alterada com sucesso!"
        });
    });
});

app.delete('/turmas/:id', (request, response) => {
    const turmas = Turmas.deleteOne({_id: request.params.id}, (erro) => {
        if(erro) return response.status(400).json({
            error: true,
            message: "Error: A turma não foi removida!"
        });

        return response.json({
            error: false,
            message: "Turma removida com sucesso!"
        });
    });
});


module.exports = app