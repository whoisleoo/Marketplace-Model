import express from 'express'
import {
    loginUser,
    verificarToken,
    logoutUser
}from '../controllers/authController.js'
import { validarLogin } from '../middlewares/validation.js';
import { verificarAuth } from '../middlewares/authValidation.js';

const router = express.Router()

// =============== ROTA DE LOGIN =========================
router.post('/login', validarLogin, loginUser);
// =============== ROTA DE VERIFICAÇÃO DE TOKEN =========================
router.get('/verify', verificarAuth, verificarToken);
// =============== ROTA DE LOGOUT =========================
router.post('/logout', verificarAuth, logoutUser)

export default router;