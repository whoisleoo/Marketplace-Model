import express from 'express'
import { prisma } from '../database/db.js'

const router = express.Router()



// ======================================= ROTAS DE REGISTRO ================================================


// Rota de registro padrão
router.post('/register', async (req, res) => {
    const { email, senha, nome, sobrenome, cpf} = req.body; // Pega todas as informações do body raw
    
    try{
    const newUser = await prisma.user.create({
      data: {
        email : email,
        senha : senha,
        nome : nome,
        sobrenome : sobrenome,
        cpf: cpf
      }
    })
    res.status(201).json({ message: "Conta criada com sucesso", data: newUser});
    console.log(`Úsuario ${newUser} foi cadastrado com sucesso.`);

}catch(error){
    console.log(`Erro ao cadastrar úsuario: ${error}`)

    if(error.code == 'P2002'){ // P2002 | Codigo de erro do prisma pra arquivos que violam o @unique
        return res.status(400).json({error: "Email ou CPF já estão em uso"})
    }

    res.status(500).json({error: "Erro interno no servidor."});
    
}
    
})


// Rota de login padrão (WIP)
router.get('/login', (req, res) =>{
      res.status(201)
    res.json([{title: "Rota de login"}, {status: "🟢 Funcionando"}])
})






// ======================================= ROTAS DE USUARIO ================================================

// GET pra puxar todos os usuarios
router.get('/user', async function (req, res) {
    try{ // Tenta fazer uma requisição pra lista de usuarios no banco de dados
         const users = await prisma.user.findMany();
          res.status(200).json(users);
        
    } catch (error){
        res.status(500).json({ error: "Erro ao buscar usuários. ", message: error.message}); // Caso de erro, retorna o erro.
    }
   
})


// GET pra puxar usuario baseado no ID
router.get('/user/:id', async function (req, res) { //usar essa mesma lógica pra requsição de produtos especificos
    const userId = req.params.id
    
        const users = await prisma.user.findUnique({ //findFirst é o primeiro a ser achado
            where: {
                id: userId
            }
        })
        res.json(users);
})


// Rota que atualiza os dados
router.put('/user/:id', async function (req, res) {
    const { id } = req.params;
    const { nome, senha } = req.body;

    const dados = prisma.user.update({
        where: {
            id: id,
            nome: {nome},
            senha: {senha}
        }
    })
    res.json({status: "Updated", new_content: dados});
})


// rota delete de usuarios teste
router.delete('/user/:id', async function (req, res) {
    const { id } = req.params;

    try{
    const dados = await prisma.user.delete({
        where: {
            id: id
        }
    })
    res.status(200).json({dados});
}catch(error){
    res.status(500).json({message: "Não deu certo pra deletar."})
}
})








export default router;