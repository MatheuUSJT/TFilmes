const mysql = require('mysql2');

const obterConexao = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
};

const validarEmail = (email, callback) => {
    const conexao = obterConexao();
    conexao.query(
        "select id_usuario from usuario where email=?",
        [email],
        (erro, resultado) => {
            callback(resultado);
        }
    );
};

const cadastrarUsuario = (usuario, callback) => {
    const conexao = obterConexao();
    conexao.execute(
        'INSERT INTO usuario(nome,email,senha) VALUES (?,?,MD5(?))',
        [usuario.nome, usuario.email, usuario.senha],
        (erro, resultado) =>{
            callback(resultado);
        }
    );
}

module.exports = {
    validarEmail,
    cadastrarUsuario
}