import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
/* components */
import { Navbar } from './components/navbar'
/* pages */
import Home from './pages/home/home'
import AddProductPage from './pages/addproduct/addproductpage.jsx';
import Cart from './pages/cart/cart'
import { Login } from './pages/login/login'
import { Register } from './pages/register/register'


function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addproduct" element={<AddProductPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
    </CookiesProvider>
  );
}

export default App;
