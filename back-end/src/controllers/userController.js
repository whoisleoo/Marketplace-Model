import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt'

// ====================================================================================================

// Rota de registro padrão
router.post('/register', async (req, res) => {
    const { email, senha, nome, sobrenome, cpf} = req.body; // Pega todas as informações do body raw
    
    try{

        const senhaHash = await bcrypt.hash(senha, 10); //criptografar a senha

    const newUser = await prisma.user.create({
      data: {
        email : email.toLowerCase().trim(),
        senha : senhaHash,
        nome : nome.trim(),
        sobrenome : sobrenome.trim(),
        cpf: cpf.replace(/\D/g, '') //Codigo pra remover caracteres não numericos, ex: "."
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
