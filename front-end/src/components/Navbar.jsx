import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Marketplace
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-200 transition">
              Produtos
            </Link>
            <Link to="/cart" className="hover:text-blue-200 transition">
              Carrinho
            </Link>
            <Link to="/login" className="hover:text-blue-200 transition">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;