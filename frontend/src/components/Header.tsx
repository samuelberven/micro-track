import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <nav className="container mx-auto flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/service-platforms" className="hover:underline">Service Platforms</Link>
        <Link to="/developers" className="hover:underline">Developers</Link>
        <Link to="/games" className="hover:underline">Games</Link>
        <Link to="/customers" className="hover:underline">Customers</Link>
        <Link to="/customers-have-games" className="hover:underline">CustomersHaveGames</Link>
        <Link to="/microtransactions" className="hover:underline">Microtransactions</Link>
        <Link to="/purchases" className="hover:underline">Purchases</Link>
      </nav>
    </header>
  );
};

export default Header;
