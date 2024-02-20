/*
    path: /api/mensajes
*/ 

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_JWT');

const { obtenerChat } = require('../controllers/mensajes');

const router = Router();

router.get('/:de', validarJWT, obtenerChat);

module.exports = router;