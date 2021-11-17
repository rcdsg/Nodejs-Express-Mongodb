const express = require('express');
const router = express.Router();
const Users = require('../model/user');

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) return res.send({error: 'Erro na consulta de usuários.'});
        return res.send(data);
    });
    
});


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
            return res.send(data);
        });
    });

    //return res.send({message: `Tudo ok com o método POST para CRIAR usuarios`});
})


module.exports = router;