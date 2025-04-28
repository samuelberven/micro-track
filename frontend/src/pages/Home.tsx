import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/service-platforms" className="block p-6 bg-gray-100 rounded shadow text-center hover:bg-gray-200">Service Platforms</Link>
        <Link to="/developers" className="block p-6 bg-gray-100 rounded shadow text-center hover:bg-gray-200">Developers</Link>
        <Link to="/games" className="block p-6 bg-gray-100 rounded shadow text-center hover:bg-gray-200">Games</Link>
        <Link to="/customers" className="block p-6 bg-gray-100 rounded shadow text-center hover:bg-gray-200">Customers</Link>
        <Link to="/customers-have-games" className="block p-6 bg-gray-100 rounded shadow text-center hover:bg-gray-200">CustomersHaveGames</Link>
        <Link to="/microtransactions" className="block p-6 bg-gray-100 rounded shadow text-center hover:bg-gray-200">Microtransactions</Link>
        <Link to="/purchases" className="block p-6 bg-gray-100 rounded shadow text-center hover:bg-gray-200">Purchases</Link>
      </div>
    </div>
  );
};

export default Home;
