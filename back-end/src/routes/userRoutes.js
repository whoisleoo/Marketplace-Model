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
import { criarProduto, listarProdutos } from '../controllers/ProductController.js';

const router = express.Router()

// =============== ROTA DE REGISTRO =========================
router.post('/register', registerLimiter, validarRegistro, registrarUser);
// =============== ROTA DE USER =============================
router.get('/user', verificarAuth, verificarAdmin, adminLimiter, listarUser);
// =============== ROTA DE PESQUISA DE USER =========================
router.get('/user/:id', validarID, verificarAuth, verificarPerm, buscarUser);
// =============== ROTA DE DELETAR USER =========================
router.delete('/user/:id', validarID, verificarAuth, verificarPerm, deleteUser);
// =============== ROTA DE PRODUTO =========================
router.post('/product/add/', criarProduto, validarProduto);



export default router;