const mysql = require('mysql2');

const obterConexao = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
};


const validarLogin = (reqemail, callback) => {
    const conexao = obterConexao();
    conexao.query(
        "select email from usuario where email=?",
        [reqemail],
        (erro, resultado) => {
            callback(resultado);
        }
    );
};

module.exports = {
    validarLogin
}