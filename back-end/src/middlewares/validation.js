// =============================================================================================
//                                   VALIDAÇÃO DE CPF
// =============================================================================================

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
}

// =============================================================================================
//                                   MIDDLWARE DE REGISTRO
// =============================================================================================

export const validarRegistro = function (req, res, next){
    const { email, senha, nome, sobrenome, cpf} = req.body;
    const erros = [];

    if(!email) erros.push("Email é obrigatório.");
    if(!senha) erros.push("Senha é obrigatória.");
    if(!nome) erros.push("Nome é obrigatório.");
    if(!sobrenome) erros.push("Sobrenome é obrigatório.");
    if(!cpf) erros.push("CPF é obrigatório.");
};