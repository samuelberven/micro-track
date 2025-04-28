import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ServicePlatforms from './pages/ServicePlatforms';
import Developers from './pages/Developers';
import Games from './pages/Games';
import Customers from './pages/Customers';
import CustomersHaveGames from './pages/CustomersHaveGames';
import Microtransactions from './pages/Microtransactions';
import Purchases from './pages/Purchases';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service-platforms" element={<ServicePlatforms />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/games" element={<Games />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers-have-games" element={<CustomersHaveGames />} />
          <Route path="/microtransactions" element={<Microtransactions />} />
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
