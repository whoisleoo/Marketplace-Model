import { useState } from "react";
import { Link } from "react-router-dom";


function Register() {

    const [loading, setLoading ] = useState(false);

    const handleSubmit = (pagina) =>{
     pagina.preventDefault();

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            alert('Teste de login.')
        }, 2000);
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

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                           />
                        </div>

                        
  <div>
                            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            
                            <input
                                id="senha"
                                name="senha"
                             type="password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite seu nome"
                            />

                            
                            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                                Sobrenome
                            </label>
                            
                            <input
                                id="senha"
                                name="senha"
                             type="password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite seu sobrenome"
                            />



                            <div>
                                <div> <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                                CPF
                            </label>
                            
                            <input
                                id="senha"
                                name="senha"
                             type="password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite seu CPF"
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