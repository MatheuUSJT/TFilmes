const mysql = require('mysql2');

const obterConexao = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
};


const getFilme = (id, callback) => {
    //date_format(f.data_lancamento,'%d/%m/%Y')
    const conexao = obterConexao();
    conexao.query(
        "SELECT f.id_filme AS 'id_filme', f.titulo AS 'titulo', date_format(f.data_lancamento,'%Y-%m-%d') 'data_lancamento', f.origem_uf AS 'origem_uf', p.pais AS 'show_pais',  f.sinopse AS 'sinopse', f.genero AS 'genero', g.descricao AS 'show_genero'" +
        " FROM filme f"+
        " left join paises p on p.codigo = f.origem_uf"+
        " left join genero g on g.codigo = f.genero"+
        " where f.id_filme = ?",[id],
        (erro, resultado) => {
            callback(resultado)
        }
    );
}

const atualizar = (f, callback) =>{
    const conexao = obterConexao();
    conexao.execute(
        "UPDATE filme SET titulo=?, data_lancamento=?, origem_uf=?, sinopse=?, genero=? WHERE id_filme=?",
        [f.titulo, f.data_lancamento, f.origem_uf, f.sinopse, f.genero, f.id_filme],
        (erro, resultado) =>{
            console.log(erro);
        }
    );
}


module.exports = {
    getFilme,
    atualizar
};