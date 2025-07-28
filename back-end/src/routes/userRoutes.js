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
import{
    verificarAuth,
    verificarAdmin,
    verificarPerm
} from '../middlewares/authValidation.js'
const router = express.Router()

// =============== ROTA DE REGISTRO =========================
router.post('/register', validarRegistro, registrarUser);
// =============== ROTA DE USER =============================
router.get('/user', verificarAuth, verificarAdmin, listarUser);
// =============== ROTA DE PESQUISA DE USER =========================
router.get('/user/:id', validarID, verificarAuth, verificarPerm, buscarUser);
// =============== ROTA DE DELETAR USER =========================
router.delete('/user/:id', validarID, verificarAuth, verificarPerm, deleteUser);




export default router;