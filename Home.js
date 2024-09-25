import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ setIsAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="home-container">
      <h1>Catálogo de Produtos</h1>
      <div className="home-buttons">
        <button onClick={goToProfile}>Perfil</button>
        <button onClick={handleLogout}>Sair</button>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Preço:</strong> ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
