const mysql = require('mysql2');

const obterConexao = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
};


const validarLogin = (login, callback) => {
    const conexao = obterConexao();
    conexao.query(
        "select id_usuario from usuario where email=? and senha=MD5(?)",
        [login.email, login.senha],
        (erro, resultado) => {
            callback(resultado);
        }
    );
};

module.exports = {
    validarLogin
}