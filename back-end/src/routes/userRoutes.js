import express from 'express'
import {
    registrarUser,
    listarUser,
    deleteUser,
    buscarUser
} from '../controllers/userController.js';
import{
    validarID,
    validarProduto,
    validarRegistro
} from '../middlewares/validation.js';
import{
    verificarAuth,
    verificarAdmin,
    verificarPerm
} from '../middlewares/authValidation.js'
import { registerLimiter, adminLimiter } from '../middlewares/rateLimit.js';

const router = express.Router()

// =============== ROTA DE REGISTRO =========================
router.post('/register', registerLimiter, validarRegistro, registrarUser);
// =============== ROTA DE USER =============================
router.get('/users', verificarAuth, verificarAdmin, adminLimiter, listarUser);
// =============== ROTA DE PESQUISA DE USER =========================
router.get('/users/:id', validarID, verificarAuth, verificarPerm, buscarUser);
// =============== ROTA DE DELETAR USER =========================
router.delete('/users/:id', validarID, verificarAuth, verificarPerm, deleteUser);



export default router;