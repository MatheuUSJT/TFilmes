const mysql = require('mysql2');

const obterConexao = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
};

const getComments = (id, callback) => {
    const conexao = obterConexao();
    conexao.query(
        "select t.id_comentario AS 'id_comentario', t.texto AS 'texto', t.data_lan AS 'data_lan', u.nome AS 'nome_usuario_lan', t.filme AS 'filme'"+
        " from comentario t"+
        " left join usuario u on u.id_usuario = t.usuario_lan"+
        " where t.filme = ?",[id],
        (erro, resultado) => {
            callback(resultado);
        }
    );
};

const inserirComentarios = (comment, callback) => {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = ano + '-' + mes + '-' + dia;
    var usuario_lan = 3;

    console.log(dataAtual);

    const conexao = obterConexao();
    conexao.execute(
        'INSERT INTO comentario(texto,data_lan,usuario_lan,filme) VALUES (?,?,?,?)',
        [comment.texto, dataAtual, comment.usuario_lan, comment.filme],
        (erro, resultado) =>{
            console.log(resultado);
        }
    );
}


const getFilme = (id, callback) => {
    const conexao = obterConexao();
    conexao.query(
        "SELECT f.id_filme AS 'id_filme', f.titulo AS 'titulo', date_format(f.data_lancamento,'%d/%m/%Y') AS 'data_lancamento', concat(p.sigla,' - ', p.pais) AS 'show_pais',  f.sinopse AS 'sinopse', g.descricao AS 'show_genero'" +
        " FROM filme f"+
        " left join paises p on p.codigo = f.origem_uf"+
        " left join genero g on g.codigo = f.genero"+
        " where f.id_filme = ?",[id],
        (erro, resultado) => {
            callback(resultado)
        }
    );
}


module.exports = {
    getComments,
    inserirComentarios,
    getFilme
};