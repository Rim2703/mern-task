import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products for the currently logged-in user
        const fetchProducts = async () => {
            try {
                // Retrieve the JWT token from localStorage
                const token = localStorage.getItem('token');

                // Make an API call to the backend to fetch products
                const response = await axios.get('http://localhost:8000/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <div className="product-cards">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <h3>{product.productName}</h3>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ${product.price}</p>
                            <img src={`http://localhost:8000/${product.productThumbnail}`} alt={product.productName} style={{ maxWidth: '200px' }} />
                            {/* {console.log(`http://localhost:8000/${product?.productThumbnail}`)} */}
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;





