import { useEffect, useState } from 'react';
import api from '../services/api.js';

function Home() {
  const [products, setProducts ] = useState([])


  async function getProducts(){
    const getProducts = await api.get('/products');

    setProducts(getProducts.data.produtos);
  }

  useEffect(() => {
    getProducts()
  }, [])


  return (
    <div className="min-h-screen">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bem vindo!
      </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl text-black font-semibold mb-4">Produtos em Destaque</h2>
        {/* TESTE DE ADICAO DE API */}
      {products.map(product => (
              <div key={product.id}>
                <p>Produto: {product.nome}</p>
                <p>Preço: {product.preco}</p>
                <p>Descrição: {product.descricao}</p>
              </div>
            ))}
      </div>
        <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl text-black font-semibold mb-4">Ofertas Especiais</h2>
          <p className="text-white">Ainda em construção</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl text-black font-semibold mb-4">Novidades</h2>
          <p className="text-white">Ainda em construção...</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;