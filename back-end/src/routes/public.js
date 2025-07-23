import express from 'express'
import { prisma } from '../database/db.js'

const router = express.Router()

// Requisição de cadastro

router.get('/register', (req, res) =>{
    res.json([{title: "Rota de cadastro"}, {status: "🟢 Funcionando"}])

    res.status(201);
})





router.get('/user', async function (req, res) {
    try{ // Tenta fazer uma requisição pra lista de usuarios no banco de dados
         const users = await prisma.user.findMany();
         res.json(users);
         res.status(200);
    } catch (error){
        res.status(500).json({ error: "Erro ao buscar usuários. "}); // Caso de erro, retorna o erro.
    }
   
})


router.get('/user/:id', async function (req, res) {
    const userId = req.params.id
    
        const users = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        res.json(users);
})



router.get('/login', (req, res) =>{
    res.json([{title: "Rota de login"}, {status: "🟢 Funcionando"}])

    res.status(201)
})


export default router;