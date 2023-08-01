import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import ProductForm from './components/Products';
import Dashboard from './components/Dashboard';
import ChangePassword from './components/ChangePassword';
import EditProductForm from './components/EditProduct';
import NewPassword from './components/NewPassword';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/change-pass" element={<ChangePassword />} />
          <Route exact path="/new-pass" element={<NewPassword />} />

          <Route exact path="/add-product" element={<ProductForm />} />
          <Route exact path="/edit-product/:id" element={<EditProductForm />} />
          <Route exact path="/home" element={<Dashboard />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App;
