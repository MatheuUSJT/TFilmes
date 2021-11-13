require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const dbComments = require('./comments');
const dbLogin = require('./login');
const dbCadastro = require('./cadastrar-usuario');
const dbEditarFilme = require ('./editar-filme');
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
            return {id_filme: f.id_filme, titulo: f.titulo, data_lancamento: f.data_lancamento, origem_uf: f.origem_uf, show_pais: f.pais, sinopse: f.sinopse,
                genero: f.genero, show_genero: f.show_genero, imagem: f.imagem, direcao: f.direcao, roteiro: f.roteiro, titulo_original: f.titulo_original, elenco: f.elenco, duracao: f.duracao, trailer: f.trailer, ativo: f.ativo}
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
    imagem: '',
    direcao:'',
    roteiro:'',
    elenco:'',
    duracao:'',
    trailer:'',
    titulo_original:''
}
//CADASTRO DE FILME
//INFOS
app.post("/filmes", (req, res) => {
    const t = req.body;
    Cadastro.titulo = t.titulo;
    Cadastro.data_lancamento = t.data_lancamento;
    Cadastro.sinopse = t.sinopse;
    Cadastro.direcao = t.direcao;
    Cadastro.roteiro = t.roteiro;
    Cadastro.elenco = t.elenco;
    Cadastro.duracao = t.duracao;
    Cadastro.trailer = t.trailer;
    Cadastro.titulo_original = t.titulo_original;
    Cadastro.genero = t.genero;
    Cadastro.origem_uf = t.origem_uf;
    
    
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



app.put("/editar-filme", (req, res) => {
    const f = req.body;
    console.log(f);
    dbEditarFilme.atualizar(f);
})

app.get('/editar-filme/:id', (req, res)=>{
    const {id} = req.params;
    dbEditarFilme.getFilme(id, filme => {
        filme = filme.map((f)=>{
            return{id_filme: f.id_filme, titulo: f.titulo, data_lancamento: f.data_lancamento, 
                origem_uf: f.origem_uf, show_pais: f.show_pais, sinopse: f.sinopse, genero: f.genero, show_genero: f.show_genero}
        });
        res.json({filme});
    });
});

app.delete("/filmes", (req, res) => {
    db.excluir(req.body, (resultado)=>{
        obterFilmes(req, res);
    });
})


//QUERYS COMMENTS
app.get('/comments/filme/:id', (req, res)=>{
    const {id} = req.params;
    dbComments.getFilme(id, filme => {
        filme = filme.map((f)=>{
            return {id_filme: f.id_filme, titulo: f.titulo, data_lancamento: f.data_lancamento, origem_uf: f.origem_uf, show_pais: f.pais, sinopse: f.sinopse,
                genero: f.genero, show_genero: f.show_genero, imagem: f.imagem, direcao: f.direcao, roteiro: f.roteiro, titulo_original: f.titulo_original, elenco: f.elenco, duracao: f.duracao, trailer: f.trailer, ativo: f.ativo}
        });
        res.json({filme});
    });
});

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

const obterComentarios = (req,res)=>{
    const id = req.body;
    dbComments.getComments(id.filme, comments =>{
        comments = comments.map((c)=>{
            return{id_comentario: c.id_comentario, texto: c.texto, data_lan: c.data_lan,
                nome_usuario_lan: c.nome_usuario_lan, filme: c.filme}
        });
        res.json({comments});
        
    });   
}

app.post("/comentario/cadastrar",(req, res)=>{
    console.log('comentario');
    const comentario = req.body;
    console.log(comentario.filme);
    dbComments.inserirComentarios(comentario, (resultado) =>{
        obterComentarios(req,res);
    });
});




//LOGIN

app.get("/login/info/", (req, res) => {
    res.json(console.log('info'));
    
});


app.get("/login/:email/:senha",(req,res)=>{
    
    if( req.params.email != 'undefined' && req.params.senha != 'undefined' ){
        login = {
            email: req.params.email,
            senha: req.params.senha
        }
    
        
        dbLogin.validarLogin(login ,Id_usuario =>{
            
            if(Id_usuario[0]){
                var id = Id_usuario[0]["id_usuario"];

                dbLogin.infoUsuario(id, usuario =>{
                    res.json({usuario});
                });

                //res.json({id});
                
            }else{
                var msg = 'E-mail ou senha incorreto!';
                res.json({msg});
            }            
        });

    }else{
        var msg = "informe o login e a senha";
        res.json({msg});
    }
});


app.post("/cadastro-usuario",(req, res)=>{
    const c = req.body;
    var id;
    dbCadastro.validarEmail(c.email, resposta=>{
        if(resposta[0]){
            //USUARIO EXISTE
            id = resposta[0]['id_usuario'];
            var msg = 'E-mail já cadastrado';
            res.json({msg});
        }else{
            //CADASTRAR NOVO
            console.log(c);
            dbCadastro.cadastrarUsuario(c,resp =>{
                id = resp.insertId;
                dbLogin.infoUsuario(id, usuario =>{
                    res.json({usuario});
                });
            });
        }

    });
});

const obterPerfis = (req, res) =>{
    dbCadastro.getPerfis((perfis) =>{
        perfis = perfis.map((p)=>{
            return {codigo: p.codigo, descricao: p.descricao}
        });
        res.json({perfis});
    });
    
}

app.get("/cadastro-usuario/perfis", (req, res) =>{
    obterPerfis(req, res);
})