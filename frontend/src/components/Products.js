import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductForm({ product }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [productThumbnail, setProductThumbnail] = useState(null);
  const history = useNavigate();


  useEffect(() => {
    // Populate the form fields with the data of the existing product 
    if (product) {
      setProductName(product.productName || '');
      setQuantity(product.quantity || '');
      setPrice(product.price || '');
      setDiscountType(product.discountType || '');
      setProductThumbnail(product.productThumbnail || null);
    }
  }, [product]);


  // Function to send the JWT token in the request headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    console.log('Token in localStorage:', token);
    return {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('quantity', quantity);
      formData.append('price', price);
      formData.append('discountType', discountType);
      formData.append('productThumbnail', productThumbnail);


      if (product) {
        // API call to update the product if a product prop is provided
        const response = await axios.put(`http://localhost:8000/product/${product._id}`, formData, {
          headers: getAuthHeaders(),
        });
        console.log('Product updated:', response.data);
      } else {
        // API call to create a new product if no product prop is provided
        const response = await axios.post('http://localhost:8000/product', formData, {
          headers: getAuthHeaders(),
        });
        console.log('Product added:', response.data);
      }

      history('/home');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='container'>

      <form className='prod-form' onSubmit={handleSubmit}>
        <h2>{product ? 'Update Product' : 'Add Product'}</h2>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Discount Type:</label>
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="">Select Discount Type</option>
            <option value="flat">Flat</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        <div>
          <label>Product Thumbnail:</label>
          <input
            type="file"
            onChange={(e) => setProductThumbnail(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">
          {product ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
