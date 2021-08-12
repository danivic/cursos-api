const express = require('express');
const cors = require('cors');
const app = express.Router();
const mongoose = require('mongoose');
app.use(express.json());


require('../models/Professores');
const Professores = mongoose.model('professores');

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

app.get('/professores/:id', (request, response) => {
    Professores.findOne({ _id: request.params.id }).then((professores) => {
        return response.json(professores);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhum professor encontrado!"
        })
    })
});

app.get('/professores', (request, response) => {
   /*  return response.status(400).json({
        error: true,
        message: "Nenhum dado encontrado!"
    })
}); */

    Professores.find({}).then((professores) => {
        return response.json(professores);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhum professor encontrado!"
        })
    })
});

app.post('/professores', (request, response) => {
    //console.log(response.body);
    //return response.json(request.body);
    const professores = Professores.create(request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: o professor não foi cadastrado!"
        })

        return response.status(400).json({
            error: false,
            message: "Professor cadastrado com sucesso!"
        })
    })
});

app.put('/professores/:id', (request, response) => {
    const professores = Professores.updateOne({ _id: request.params.id }, request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: O professor não foi alterado!"
        });

        return response.json({
            error: false,
            message: "Professor alterado com sucesso!"
        });
    });
});

app.delete('/professores/:id', (request, response) => {
    const professores = Professores.deleteOne({_id: request.params.id}, (erro) => {
        if(erro) return response.status(400).json({
            error: true,
            message: "Error: O professor não foi removido!"
        });

        return response.json({
            error: false,
            message: "Professor removido com sucesso!"
        });
    });
});


module.exports = app