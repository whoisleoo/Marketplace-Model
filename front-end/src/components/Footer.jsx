import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
    <div className="flex flex-col md:flex-row justify-between items-center">
          

    <div className="mb-4 md:mb-0">
        <h3 className="text-xl font-bold">Marketplace</h3>
      </div>

  
    <div className="flex align-middle space-x-6 mb-4 md:mb-0">
            <Link to="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-300 transition">
              Produtos
            </Link>
            <Link to="/contact" className="hover:text-gray-300 transition">
              Contato
            </Link>
          </div>

          <div className="text-sm text-gray-400">
            © 2025 Marketplace - Feito por Codduo
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;