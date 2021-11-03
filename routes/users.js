const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: `Tudo ok com o método GET da rota de usuarios`});
})

router.post('/', (req, res) => {
    return res.send({message: `Tudo ok com o método POST da rota de usuarios`});
})

router.post('/create', (req, res) => {
    return res.send({message: `Tudo ok com o método POST para CRIAR usuarios`});
})


module.exports = router;