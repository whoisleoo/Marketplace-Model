import { prisma } from "../database/db.js";
import bcrypt from 'bcrypt'

// ====================================================================================================
//                                      ROTA DE REGISTRO
// ====================================================================================================

  export const registrarUser = async function (req, res){
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
    });

    const { senha: _, ...userFilter } = newUser; //Destruct do array pra pra não incluir a senha.

    res.status(201).json({ message: "Conta criada com sucesso", user: userFilter});
    console.log(`Úsuario ${userFilter.nome} foi cadastrado com sucesso.`);

}catch(error){
    console.log(`Erro ao cadastrar úsuario: ${error}`)

    if(error.code == 'P2002'){ // P2002 | Codigo de erro do prisma pra arquivos que violam o @unique
        const campo = error.meta?.target?.[0] || 'Algum campo'; // Extrai o campo que deu erro
        return res.status(400).json({error: `${campo === 'email' ? 'Email' : 'CPF'} já está em uso.`}) // Verifica qual campo deu erro, se foi o email retorna o email se foi o cpf retorna o cpf
    }

    res.status(500).json({error: "Erro interno no servidor."});
}
    
}
// ====================================================================================================
//                                    ROTA DE LISTAGEM DE USUARIO
// ====================================================================================================

export const listarUser = async function (req, res){
    try{ // Tenta fazer uma requisição pra lista de usuarios no banco de dados
         const users = await prisma.user.findMany({
          select: {
          id: true,
          email: true,
          nome: true,
          sobrenome: true,
          role: true,
          criado: true,
          status: true
          }
         });
          res.status(200).json(users);
        
    } catch (error){
        res.status(500).json({ error: "Erro ao buscar usuários. ", message: error.message}); // Caso de erro, retorna o erro.
    }
  }

// ====================================================================================================
//                                      ROTA DE BUSCA DE USUARIO
// ====================================================================================================

export const buscarUser = async function (req, res){
    const { id } = req.params
    

    try{
        const users = await prisma.user.findUnique({ //findFirst é o primeiro a ser achado
            where: { id },
            select: {
              id: true,
              email: true,
              nome: true,
              sobrenome: true,
              role: true,
              cpf: true,
              endereco: true,
              telefone: true,
              criado: true,
              status: true

            }
        });

        if(!users){
          res.status(404).json({error: "Usuário não encontrado."}) // Pra não retornar null.
        }
        res.status(200).json({message: "Usuario encontrado com sucesso", user: users});
      }catch(error){
        res.status(500).json({error: "Erro interno doservidor", erro_encontrado: error.message});
      }
}

// ====================================================================================================
//                                      ROTA DE EXCLUSÃO DE USUARIO
// ====================================================================================================

export const deleteUser = async function (req, res){
  const { id } = req.params;

   try{
    const dados = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    if(!dados){
      return res.status(404).json({error: "Usuário não encontrado."})
    }

    await prisma.user.update({ // Ao inves de dar delete só da um update pra desativar a conta.
      where: { id },
      data: { status: false }
    });


    res.status(200).json({message: "Usuario desativado com sucesso", user: dados.nome});
}catch(error){
    res.status(500).json({message: "Erro interno do servidor. ", error: error.message})
  }
};
