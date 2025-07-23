import express from 'express'

const router = express.Router()

// Requisição de cadastro

router.get('/register', (req, res) =>{
    res.json([{title: "Rota de cadastro"}, {status: "🟢 Funcionando"}])

    res.status(201)
})

router.get('/login', (req, res) =>{
    res.json([{title: "Rota de login"}, {status: "🟢 Funcionando"}])

    res.status(201)
})


export default router;