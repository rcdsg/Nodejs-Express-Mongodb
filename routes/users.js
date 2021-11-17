const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');

//Refactoring - try - catch - GET
router.get('/', async  (req, res) => {
   try{
    const users = await Users.find({});
    return res.send(users);
   } 
   catch (err){
    return res.send({error: 'Erro na consulta de usuários!'});
    
   }
    
});


//Refactoring - try - catch - CREATE
router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes para serem cadastrados!'} );

    try {

        if ( await Users.findOne({ email }) ) return res.send({error: 'Usuário já existe!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send(user);
        
    }
    catch (err) {
        return res.send({ error : 'Usuário não encontrado!' });
    }
});


//Refactoring - try - catch - AUTH PASSWORD
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.send({ error: 'Dados insuficientes!' });

    try{
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.send({ error: 'Usuário não registrado!'});

        const password_ok = await bcrypt.compare(password, user.password);

        if (!password_ok) return res.send({error: 'Erro ao autenticar o usuário!'});

        user.password = undefined;
        return res.send(user);

    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar Usuário!' });
    }

});

module.exports = router;