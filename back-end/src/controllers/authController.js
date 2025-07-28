import { prisma } from '../database/db.js';
import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';

/* 
OQUE PRECISA SER FEITO:
Uma função async que logue o usuario, ela requere os campos do login e utiliza o prisma pra achar o email unico atravez do where, depois seleciona os outros campos.
verifica se o usuario foi achado e retorna as respostas pro body.
verifica também se a conta está ativa ou não.
precisa também utilizar o bcrypt pra comprar se a senha digitada confere com a senha real do usuario
se estive errada faz a verificação.
*/


// ====================================================================================================
//                                      ROTA DE LOGIN
// ====================================================================================================

export const loginUser = async function (req, res){
    const { email, senha } = req.body;

    try{
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
        select: {
          id: true,
          email: true,
          senha: true,
          nome: true,
          sobrenome: true,
          role: true,
          criado: true,
          status: true
        }
    })
    if(!user){
       return res.status(401).json({error: "Usuário com esse email não encontrado"});
    }

    if(!user.status){
       return res.status(401).json({error: "Usuário desativado."})
    }

    const match = await bcrypt.compare(senha, user.senha); // Utiliza o bcrypt pra comparar a senha em hash com a senha requisitada.

    if(!match){
       return res.status(401).json({error: "Email ou senha incorretos."})
    }

    const token = jwt.sign( // Criação do token via jwt
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );

    const {senha: _, ...userFilter } = user; //Desconstrução do user pra remover o campo de senha.

    res.status(200).json({
        message: "Usuario logado com sucesso.",
        user: userFilter,
        token: token
    })



    }catch(error){
        res.status(500).json({
            message: "Erro interno no servidor.",
            erro: error.message
        })
    }
}

// ====================================================================================================
//                                      VERIFICAÇÃO DE TOKEN
// ====================================================================================================

export const verificarToken = async function (req, res){ // Usada para verificação de autorização.
    try{
        const { id } = req.user;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                senha: true,
                nome: true,
                sobrenome: true,
                role: true,
                criado: true,
                status: true
            }
        });

        if(!user || !user.status){
            return res.status(401).json({
                error: "Token inválido ou usuário desativado."
            })
        }

        res.status(200).json({
            message: "Token válido.",
            user: user
        })



    }catch(error){
        res.status(500).json({
            message: "Erro interno do servidor",
            error: error.message
        });
    }
}

// ====================================================================================================
//                                      VERIFICAÇÃO DE TOKEN
// ====================================================================================================