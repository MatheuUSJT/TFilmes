const mysql = require('mysql2');

const obterConexao = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
}

const listar = (callback) => {
    const conexao = obterConexao();
    conexao.query(
        "SELECT f.id_filme AS 'id_filme', f.titulo AS 'titulo', date_format(f.data_lancamento,'%d/%m/%Y') AS 'data_lancamento', p.pais AS 'pais', f.sinopse AS 'sinopse', g.descricao AS 'genero'" +
        " FROM filme f"+
        " left join paises p on p.codigo = f.origem_uf"+
        " left join genero g on g.codigo = f.genero"+
        " where f.ativo = 1",
        (erro, resultado) => {
            callback(resultado)
        }
    );
}

const detalhesDoFilme = (callback) => {
    const conexao = obterConexao();
    conexao.query(
        "SELECT f.id_filme AS 'id_filme', f.titulo AS 'titulo', date_format(f.data_lancamento,'%d/%m/%Y') AS 'data_lancamento', p.pais AS 'pais', f.sinopse AS 'sinopse', g.descricao AS 'genero'" +
        " FROM filme f"+
        " left join paises p on p.codigo = f.origem_uf"+
        " left join genero g on g.codigo = f.genero"+
        " where f.id_filme = ?",[filme.id_filme],
        (erro, resultado) => {
            callback(resultado)
        }
    );
}


const getGenero = (callback) => {
    const conexao = obterConexao();
    conexao.query(
        'SELECT * FROM genero',
        (erro, resultado) => {
            callback(resultado)
        }
    );
}


const getPais = (callback) => {
    const conexao = obterConexao();
    conexao.query(
        'SELECT * FROM paises',
        (erro, resultado) => {
            callback(resultado)
        }
    );
}

const inserir = (filme, callback) => {
    const conexao = obterConexao();
    conexao.execute(
        'INSERT INTO filme(titulo,origem_uf,sinopse,genero,data_lancamento) VALUES (?,?,?,?,?)',
        [filme.titulo, filme.origem_uf, filme.sinopse, filme.genero, filme.data_lancamento],
        (erro, resultado) =>{
            callback(resultado);
        }
    );
}

const atualizar = (filme, callback) =>{
    const conexao = obterConexao();
    conexao.execute(
        'UPDATE filme SET titulo=?, data_lancamento=? origem_uf=?, sinopse=?, genero=? WHERE id_filme=?',
        [filme.titulo, filme.data_lancamento, filme.origem_uf, filme.sinopse, filme.genero],
        (erro, resultado) =>{
            callback(resultado);
        }
    );
}

const excluir = (filme, callback) => {
    const conexao = obterConexao();
    conexao.execute(
        'DELETE FROM filme WHERE id_filme = ?',
        [filme.id_filme],
        (erro, resultado) =>{
            callback(resultado);
        }
    );
}

module.exports = {
    listar,
    inserir, 
    atualizar,
    excluir, 
    getPais,
    getGenero
}