const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) return res.send({error: 'Erro na consulta de usuários.'});
        return res.send(data);
    });
    
});

//CREATE
router.post('/create', (req, res) => {
    //const obj = req.body;
    // opcao desustrurando um objeto es6
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes para serem cadastrados!'} );
    
    Users.findOne({email}, (err, data) => {
        if (err) return res.send({ error : 'Usuário não encontrado!' });
        if (data) return res.send({ error: 'Usuário já existe!' });
        
        
        Users.create(req.body, (err,data) => {
            if (err) return res.send({ error: 'Erro ao criar o usuário!' });
            data.password = undefined;
            return res.send(data);
        });
    });

    //return res.send({message: `Tudo ok com o método POST para CRIAR usuarios`});
})


router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.send({error: 'Dados insuficientes!' })

    Users.findOne({email}, (err, data) =>{
        if(err) return res.send({err: 'Erro ao buscar Usuário!'});
        if (!data) return res.send({ err: 'Usuário nao registrado!'});

        bcrypt.compare(password, data.password, (err, same) => {
            if(!same) return res.send({err: 'Erro ao autenticar o usuário!'});
            
            data.password = undefined;
            return res.send(data);

        });

    }).select('+password');

});

module.exports = router;