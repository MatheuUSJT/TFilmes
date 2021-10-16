require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => console.log("up and running"));


// MYSQL 

const obterFilmes = (req, res) =>{
    db.listar((filmes)=>{
        filmes = filmes.map((f)=>{
            return {id_filme: f.id_filme, titulo: f.titulo, data_lancamento: f.data_lancamento, pais_origem: f.pais, sinopse: f.sinopse,
            show_genero: f.genero}
        });
        res.json({filmes});
    });
}

const obterPaises = (req, res) => {
    db.getPais((pais)=>{
        pais = pais.map((p)=>{
            return{codigo: p.codigo, sigla: p.sigla, pais: p.pais}
        });
        res.json({pais});
    });
}

/*const obterTotal = (req, res) => {
    db.total((listaTotal) => {
        listaTotal = listaTotal.map((t) =>{
            return {valor: t.valor}
        });
        res.json({listaTotal});
    })
}*/

app.get("/tarefas/paises", (req, res) => {
    obterPaises(req, res);
})

/*app.get("/tarefas/total", (req, res) => {
    obterTotal(req, res);
})*/

//http://localhost:3000/filmes (GET)
app.get("/filmes", (req, res) => {
    obterFilmes(req, res);
    //res.json({tarefas});
})

//http://localhost:3000/tarefas (POST)
app.post("/filmes", (req, res) => {
    const t = req.body;
    db.inserir(t, (resultado) =>{
        obterFilmes(req, res);
    });
});

app.put("/filmes", (req, res) => {
    db.atualizar(req.body, (resultado) =>{
        obterFilmes(req, res);
    });
})

app.delete("/filmes", (req, res) => {
    db.excluir(req.body, (resultado)=>{
        obterFilmes(req, res);
    });
})


