const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const url = config.db_string;

const options = {
    //reconnectTries: Number.MAX_VALUE, //Não é suportado. Verificar outra opção de reconectar!
    serverSelectionTimeoutMS: 500,
    maxPoolSize: 5,
    useNewUrlParser: true
};

mongoose.connect(url, options);
//mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o Banco de dados: ' + err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do Banco de Dados!');
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao Banco de Dados!');
})


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;