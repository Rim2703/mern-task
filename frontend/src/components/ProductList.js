import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../assets/pencil-line.svg';
import { useNavigate } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const history = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [searchTerm, sortOrder, page])

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:8000/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    sortBy: sortOrder,
                    searchTerm,
                    page,
                },
            });

            const { totalProducts, products } = response.data; // Destructure the totalProducts and products from the response data

            // Calculate the pageCount based on the total number of products and the number of products per page (ITEM_PER_PAGE)
            const ITEM_PER_PAGE = 4;
            const pageCount = Math.ceil(totalProducts / ITEM_PER_PAGE);

            setPageCount(pageCount);
            setProducts(products);
        } catch (error) {
            console.error(error.message);
        }
    };


    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    // pagination
    const handlePrevious = () => {
        setPage((prevPage) => {
            if (prevPage === 1) return prevPage;
            return prevPage - 1;
        });
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handleNext = () => {
        setPage((prevPage) => {
            if (prevPage === pageCount) return prevPage;
            return prevPage + 1;
        });
    };

    const handleUpdateProduct = (productId) => {
        console.log(`Updating product with ID: ${productId}`);
        history(`/edit-product/${productId}`);
    };

    return (
        <div>
            <h2>Product List</h2>
            <div>
                <label>Sort Order:</label>
                <select className='search-button' value={sortOrder} onChange={handleSortChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

            </div>
            <form onSubmit={handleSearchSubmit}>
                <label>Search by Name:</label>
                <input type="text" value={searchTerm} onChange={handleSearch} />
                <button className='search-button' type="submit">Search</button>
            </form>

            <div className="product-cards">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img
                                className="icon"
                                src={Icon}
                                alt="icon"
                                onClick={() => handleUpdateProduct(product._id)}
                            />
                            <h3>{product.productName}</h3>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ${product.price}</p>
                            <img
                                src={`http://localhost:8000/${product.productThumbnail}`}
                                alt={product.productName}
                                style={{ maxWidth: '200px' }}
                            />
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            {pageCount > 1 && (
                <div className='pagination'>
                    <button onClick={handlePrevious} disabled={page === 1}>
                        Previous
                    </button>

                    {getPageNumbers().map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={page === pageNumber ? 'active' : ''}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button onClick={handleNext} disabled={page === pageCount}>
                        Next
                    </button>
                </div>
            )}

        </div>
    )
}

export default ProductList;

