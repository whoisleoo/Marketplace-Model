// =============================================================================================
//                                   VALIDAÇÃO DE CPF
// =============================================================================================

import { parse } from "dotenv";
import { decode } from "jsonwebtoken";

export const validarCPF = function (cpf){
    cpf = cpf.replace(/\D/g, '') // Remove a pontuação e traços do CPF via regex

    if(cpf.length !== 11){
        return false;
    }

    const proxDigitoVerificador = (cpfIncompleto) => {
        let soma = 0;
        for(let i = 0; i < cpfIncompleto.length; i++){
            let indiceAtual = cpfIncompleto.charAt(i); //Percorre todo o CPF
            let constante = (cpfIncompleto.length + 1 - i) // Ta em 9, va pro 10 e vai até o 2 representando as constantes

            soma += Number(indiceAtual) * constante; // Faz a soma do digito atual vezes a constante
        }
        const resto = soma % 11;

        return resto < 2 ? "0" : (11 - resto).toString() // Se o resto for menor que 2 retorna 0 se não retorna o resto
    }

    let primDigitoVerificador = proxDigitoVerificador(cpf.substring(0, 9)) // Percorre apenas os 9 digitos do CPF
    let segunDigitoVerificador = proxDigitoVerificador(cpf.substring(0, 9) + primDigitoVerificador)

    let cpfCorreto = cpf.substring(0,9 ) + primDigitoVerificador + segunDigitoVerificador;

    if(cpf != cpfCorreto){
        return false
    } else{
        return true;
    }
};

// =============================================================================================
//                                   VALIDAÇÃO DE EMAIL
// =============================================================================================

export const validarEmail = function (email){
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    return regex.test(email);
}

// =============================================================================================
//                                   MIDDLWARE DE REGISTRO
// =============================================================================================

export const validarRegistro = function (req, res, next){
    const { email, senha, nome, sobrenome, cpf} = req.body;
    const erros = []; // Array pra armazena erro

    // Verificação de existencia de campo
    if(!email) erros.push("Email é obrigatório.");
    if(!senha) erros.push("Senha é obrigatória.");
    if(!nome) erros.push("Nome é obrigatório.");
    if(!sobrenome) erros.push("Sobrenome é obrigatório.");
    if(!cpf) erros.push("CPF é obrigatório.");

    //Verificação e validação dos campos.
    if(email && !validarEmail(email)){ // CRIAR FUNÇÃO DE VALIDAÇÃO DE EMAIL!!!!
        erros.push("Email deve ter um formato válido.");
    };
    if(senha && senha.length < 5 ){ // CRIAR VALIDAÇÃO DE SENHA MAIS ROBUSTA!!!
        erros.push("Senha deve ter no minimo 5 digitos.")
    };
    if(cpf && !validarCPF(cpf)){
        erros.push("CPF deve ser válido.")
    };
    if(nome && nome.trim().length < 3){
        erros.push("Nome deve ter pelo menos 3 digitos.")
    };
    if(sobrenome && sobrenome.trim().length < 2){
        erros.push("Sobrenome deve ter pelo menos 2 digitos.")
    };

    if(erros.length > 0){
        return res.status(400).json({
            error: "Dados inválidos",
            erros_encontrados: erros
        })
    }
    next(); // Continua se não achar erro.
    };


// =============================================================================================
//                                   MIDDLWARE DE LOGIJN
// =============================================================================================   

export const validarLogin = function (req, res, next){
    const { email, senha } = req.body;
    const erros = [];

    if(!email) erros.push("Email é obrigatório.");
    if(!senha) erros.push("Senha é obrigatória.");

    if(email && !validarEmail(email)){
        erros.push("Email fornecido está incorreto.");
    }

    if(senha && senha.length < 3){
        erros.push("Sua senha deve ter pelo menos 3 caracteres.")
    }

    if(erros.length > 0){
        return res.status(400).json({
            error: "Dados inválidos",
            erro_encontrado: erros
        })
    }
    next();
};

// =============================================================================================
//                                   VALIDAÇÃO DE ID
// =============================================================================================

export const validarID = function (req, res, next){
    const { id } = req.params;

    const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; // formato do prisma pra regex

    if(!uuidRegex.test(id)){
        return res.status(400).json({
            error: "ID deve ser um UUID válido."
        });
    }
    next();
};



// =============================================================================================
//                                   VALIDAÇÃO DE PRODUTO
// =============================================================================================


export const validarProduto = function (req, res, next){
    const { nome, preco, categoria, estoque } = req.body;
    const erros = []; // Array pra armazena erro

    
    if(!nome) erros.push("Nome do produto é obrigatório.");
    if(!preco) erros.push("Preço do produto é obrigatória.");
    if(!categoria) erros.push("Categoria do produto é obrigatório.");
    if(!estoque) erros.push("Número de estoque é obrigatório.");


   if(nome && nome.trim().length < 3){
    erros.push("O nome do produto precisa ter no mínimo 3 caracteres.")
   }
   if(preco && isNaN(preco) || parseFloat(preco) <= 0 ){
    erros.push("O preço deve ser maior que zero.");
   }

   if(estoque && isNaN(estoque) || parseInt(estoque) < 0){
    erros.push("O número do estoque não pode ser negativo.")
   }

    if(erros.length > 0){
        return res.status(400).json({
            error: "Dados inválidos",
            erros_encontrados: erros
        })
    }
    next(); 
    };


    // =============================================================================================
//                                   VALIDAÇÃO Do CARRINHO
// =============================================================================================

export const validarCarrinho = function (req, res, next){
        const { produtoId, quantidade } = req.body;
        const erros = [];

        if (!produtoId) erros.push("ID do produto não especificado.");
        if(quantidade && (isNaN(quantidade)) || parseInt(quantidade) <= 0){
            erros.push("Quantidade não pode ser um número negativo.")
        };


        if(erros.length > 0){
            return res.status(400).json({
                error: "Dados invalidos",
                problemas: erros
            })
        }
}  