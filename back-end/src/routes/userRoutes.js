import express from 'express'
import {
    registrarUser,
    listarUser,
    deleteUser,
    buscarUser
} from '../controllers/userController.js';
import{
    validarID,
    validarRegistro
} from '../middlewares/validation.js';
const router = express.Router()

// =============== ROTA DE REGISTRO =========================
router.post('/register', validarRegistro, registrarUser);
// =============== ROTA DE USER =========================
router.get('/user', listarUser);
// =============== ROTA DE PESQUISA DE USER =========================
router.get('/user/:id', validarID, buscarUser);
// =============== ROTA DE DELETAR USER =========================
router.delete('/user/:id', validarID, deleteUser);




export default router;