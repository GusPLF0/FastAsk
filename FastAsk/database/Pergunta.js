const Sequelize = require("sequelize");

const  connection = require("./database");


const Pergunta = connection.define('perguntas',{ //Criação das tabelas
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});


Pergunta.sync({force:false}).then(()=>{}); //Passando para o banco de dados

module.exports = Pergunta;