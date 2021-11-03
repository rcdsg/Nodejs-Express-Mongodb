const express = require('express');
const route = express.Router();

router.get('/', (req, res) => {
    return res.send({message: `Tudo ok com o método GET da rota de usuarios`});
})

router.post('/', (req, res) => {
    return res.send({message: `Tudo ok com o método POST da rota de usuarios`});
})


module.exports = router;