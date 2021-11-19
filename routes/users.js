const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Common Functions
const createUserToken = (userId) => {
    return jwt.sign({ id: userId}, 'front123', {expiresIn: '7d'});
}


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

        return res.status(201).send({user, token: createUserToken(user.id)});
        
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
        return res.send({user, token: createUserToken(user.id) });

    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar Usuário!' });
    }

});

module.exports = router;


/*

BEST STATUS CODES

200 = OK
201 = CREATED
202 = ACCEPTED

400 = BAD REQUEST
401 = UNAUTHORIZED - AUTHENTICATION
403 = FORBIDDEN - AUTORIZATION
404 = NOT FOUND

500 = INTERNAL SERVER ERROR
501 = NOT IMPLEMENTED
503 = SERVICE UNAVAILABLE

*/