const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb+srv://rcdsg2021:Rc_200822@billing-cycles-backend.fggn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o Banco de dados:' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('desconectado ao banco de dados');
});

mongoose.connection.on('connected', () => {
    console.log('tudo conectado!');
});

// Body parser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.urlencoded.json());


const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;