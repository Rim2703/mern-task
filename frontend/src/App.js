import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import ProductForm from './components/Products';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/products" element={<ProductForm />} />
          <Route exact path="/home" element={<Dashboard />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App;
