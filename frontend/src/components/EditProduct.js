import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductForm from './Products';

function EditProductForm() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        // Fetch the existing product data from the backend using the product ID
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProduct(response.data.product);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            <ProductForm product={product} />
        </div>
    );
}

export default EditProductForm;
