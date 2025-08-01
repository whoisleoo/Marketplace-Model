import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from '../services/api.js';

function Register() {
const inputEmail = useRef();
const inputPass = useRef();
const inputName = useRef();
const inputSobrenome = useRef();
const inputCpf = useRef();
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState(null);
const [messageType, setMessageType] = useState(null);

const HandleRegister = async function (e){
    e.preventDefault();
    setLoading(true);
    setMessage(null);


   try{ 
    await api.post('/register', {
        email: inputEmail.current.value,
        senha: inputPass.current.value,
        nome: inputName.current.value,
        sobrenome: inputSobrenome.current.value,
        cpf: inputCpf.current.value
    })

    setMessage("Registro realizado com sucesso!");
    setMessageType("success");
    console.log("Registro bem-sucedido");

    window.location.href = 'http://localhost:5173/login'; // vai pro login

}catch(error){
       const errorMsg =  error.response?.data?.error || // Pega o erro da resposta
         error.response?.data?.message ||  // Pega a mensagem da resposta
        "Erro ao tentar fazer o registro."; // Caso nenhuma seja favoravel retorna isso

        setMessage(errorMsg); // bota no usestate a mensagem do erro
        setMessageType("error"); 
    console.log("VOCE NAO REGISTROU POR CAUSA DISSO: " + error);
}finally{
    setLoading(false)
}
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
            <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Crie sua conta
                  </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                      Ou{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                          entre me uma conta já existente.
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={HandleRegister}>
                    {message && (
        <div className={`text-sm text-center font-medium ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}> 
            {message}
        </div>
    )}
                    <div className="space-y-4">
                     <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                            </label>
                            <input
                                name="email"
                               type="email"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite seu email"
                                ref={inputEmail}
                           />
                        </div>

                        
  <div>
                            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            
                            <input
                                id="senha"
                                name="senha"
                             type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite seu nome"
                                  ref={inputName}
                            />

                            
                            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                                Sobrenome
                            </label>
                            
                            <input
                                id="senha"
                                name="senha"
                             type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite seu sobrenome"
                                  ref={inputSobrenome}
                            />



                            <div>
                                <div> <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                                CPF
                            </label>
                            
                            <input
                                id="senha"
                                name="senha"
                             type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite seu CPF"
                                  ref={inputCpf}
                            /></div>
                        
                            
                
                    </div>


                
                    </div>
                        

                     <div>
                            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                id="senha"
                                name="senha"
                             type="password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite sua senha"
                                  ref={inputPass}
                            />
                    </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                               type="checkbox"
                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                     <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Lembrar de mim
                </label>
            </div>

                
             </div>

                    <div>
                      <button
                          type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                    {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                  </div>

                  <div className="text-center">
                        <span className="text-sm text-gray-600">
                           Já possui uma conta?{' '}
                           <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                               Entre aqui
                          </Link>
                        </span>
                   </div>
            </form>
            </div>
        </div>
    );
}

export default Register;