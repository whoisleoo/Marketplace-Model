import express from 'express'
import { prisma } from '../database/db.js'

const router = express.Router()


router.get('/teste', (req, res) =>{
      res.status(201)
    res.json([{title: "Rota de rota de tes"}, {status: "🟢 Funcionando"}])
})
export default router;