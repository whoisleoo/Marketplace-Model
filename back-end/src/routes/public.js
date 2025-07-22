import express from 'express'

const router = express.Router()

// Requisição de cadastro

router.post('/cadastro', (req, res) =>{
    const user = req.body

    res.status(201).json(user);
})


export default router;