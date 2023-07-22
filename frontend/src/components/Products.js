import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [productThumbnail, setProductThumbnail] = useState(null);


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

      // API call to create a new product
      const response = await axios.post('http://localhost:8000/product', formData, {
        headers: getAuthHeaders(),
      });

      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='form'>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
