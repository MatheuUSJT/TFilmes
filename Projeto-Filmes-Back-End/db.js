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
        "SELECT f.id_filme AS 'id_filme', f.titulo AS 'titulo', date_format(f.data_lancamento,'%d/%m/%Y') AS 'data_lancamento', f.origem_uf AS 'origem_uf', concat(p.sigla,' - ',p.pais) AS 'pais', f.sinopse AS 'sinopse', f.genero AS 'genero',g.descricao AS 'show_genero'" +
        ", f.imagem AS 'imagem', f.direcao AS 'direcao', f.roteiro AS 'roteiro', f.titulo_original AS 'titulo_original', f.elenco AS 'elenco', f.duracao AS 'duracao', f.trailer AS 'trailer', f.ativo AS 'ativo'"+
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
        'INSERT INTO filme(titulo,data_lancamento,sinopse,direcao,roteiro,elenco,duracao,trailer,titulo_original,genero,origem_uf,imagem) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [filme.titulo, filme.data_lancamento, filme.sinopse, filme.direcao, filme.roteiro, filme.elenco, filme.duracao, filme.trailer, filme.titulo_original, filme.genero, filme.origem_uf, filme.imagem],
        (erro, resultado) =>{
            console.log(erro);
            console.log(resultado);
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
    excluir, 
    getPais,
    getGenero
}