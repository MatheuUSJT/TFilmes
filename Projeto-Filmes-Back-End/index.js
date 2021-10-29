require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const dbComments = require('./comments');
const dbLogin = require('./login');
const express = require('express');
const { json } = require('express');
const multipart = require('connect-multiparty')

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => console.log("up and running"));

// MYSQL 

const obterFilmes = (req, res) =>{
    db.listar((filmes)=>{
        filmes = filmes.map((f)=>{
            return {id_filme: f.id_filme, titulo: f.titulo, data_lancamento: f.data_lancamento, origem_uf: f.origem_uf, pais_origem: f.pais, sinopse: f.sinopse,
            genero: f.genero, show_genero: f.show_genero}
        });
        res.json({filmes});
    });
}

const obterPaises = (req, res) => {
    db.getPais((paises)=>{
        paises = paises.map((p)=>{
            return{codigo: p.codigo, sigla: p.sigla, pais: p.pais}
        });
        res.json({paises});
    });
}

const obterGeneros = (req, res) => {
    db.getGenero((generos)=>{
        generos = generos.map((g)=>{
            return{codigo: g.codigo, descricao: g.descricao}
        });
        res.json({generos});
    });
}

app.get("/generos", (req, res) => {
    obterGeneros(req, res);
});

app.get("/paises", (req, res) => {
    obterPaises(req, res);
})

//http://localhost:3000/filmes (GET)
app.get("/filmes", (req, res) => {
    obterFilmes(req, res);
    //res.json({tarefas});
})



var Cadastro = {
    titulo: '',
    data_lancamento: '',
    origem_uf: 0,
    sinopse: '',
    genero: 0,
    imagem: ''
}
//CADASTRO DE FILME
//INFOS
app.post("/filmes", (req, res) => {
    const t = req.body;
    Cadastro.titulo = t.titulo;
    Cadastro.data_lancamento = t.data_lancamento;
    Cadastro.origem_uf = t.origem_uf;
    Cadastro.sinopse = t.sinopse;
    Cadastro.genero = t.genero;
    console.log(Cadastro);
    /* db.inserir(t, (resultado) =>{
        obterFilmes(req, res);
    }); */
});

//SALVAR IMG DO CADASTRO
//const multipartMiddleware = multipart({ uploadDir: './img-filme'});
var img;
const multipartMiddleware = multipart({ uploadDir: '../Projeto-Filmes/src/assets/imgs'});
app.post('/filmes/upload', multipartMiddleware, (req, res)=>{
    const files = req.files;
    var strigRetorno = files['file']['path'];
    img = '..' + strigRetorno.substring(21);
    
    Cadastro.imagem = img;

    db.inserir(Cadastro);

    res.json({strigRetorno});
});




app.put("/filmes", (req, res) => {
    const f = req.body;
    db.atualizar(f, (resultado) =>{
        obterFilmes(req, res);
    });
})

app.delete("/filmes", (req, res) => {
    db.excluir(req.body, (resultado)=>{
        obterFilmes(req, res);
    });
})


//QUERYS COMMENTS

app.get("/comments/:id",(req, res) => {
    const {id} = req.params;
    dbComments.getComments(id, comments =>{
        comments = comments.map((c)=>{
            return{id_comentario: c.id_comentario, texto: c.texto, data_lan: c.data_lan,
                nome_usuario_lan: c.nome_usuario_lan, filme: c.filme}
        });
        res.json({comments});
        
    });   
});




//LOGIN
app.get("/login/:email/:senha",(req,res)=>{
    
    if( req.params.email != 'undefined' || req.params.senha != 'undefined' ){
        login = {
            email: req.params.email,
            senha: req.params.senha
        }

        console.log('email ' + req.params.email );
        console.log('senha ' + req.params.senha);
    
        dbLogin.validarLogin(login ,Id_usuario =>{
            var id = Id_usuario[0]["id_usuario"];
            console.log(id);
            res.json({id});
        });

    }else{
        var msg = "informe o login e a senha";
        res.json({msg});
    }



    
});