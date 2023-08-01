const Product = require('../models/productModel');

const createProduct = async (req, res) => {
    try {

        const {
            productName,
            quantity,
            price,
            discountType,
        } = req.body;


        if (!req.file) {
            return res.status(400).json({ error: 'Product thumbnail is missing' });
        }

        // Extract the file paths of the uploaded images
        // const productThumbnail = req.file.path;
        const productThumbnail = req.file.path.replace(/\\/g, '/');

        const userId = req.user.userId;
        // console.log(userId)

        // Create a new product object with the received data and image paths
        const product = new Product({
            userId,
            productName,
            quantity,
            price,
            discountType,
            productThumbnail,

        });

        // Save the product to the database
        await product.save();

        res.status(201).json({ message: 'Product created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message })
    }
}


const getProduct = async (req, res) => {
    try {
        const userId = req.user.userId;
        let { sortBy, searchTerm } = req.query;
        let page = parseInt(req.query.page, 10) || 1;
        const ITEM_PER_PAGE = 4;

        // Validate the page value to ensure it's a positive integer
        if (isNaN(page) || page < 1) {
            return res.status(400).json({ error: 'Invalid page value' });
        }

        // Create a query object to find products for the logged-in user
        const query = { userId };

        // Handle search functionality (if searchTerm is provided)
        if (searchTerm) {
            query.productName = { $regex: searchTerm, $options: "i" };
        }

        // Create a sort object based on the sortBy parameter
        let sort = {};
        if (sortBy === 'asc') {
            sort = { productName: 1 }; // Sort in ascending order by productName
        } else if (sortBy === 'desc') {
            sort = { productName: -1 }; // Sort in descending order by productName
        }

        const skip = (page - 1) * ITEM_PER_PAGE;

        const count = await Product.countDocuments(query);
        const products = await Product.find(query).sort(sort).limit(ITEM_PER_PAGE).skip(skip);

        const pageCount = Math.ceil(count / ITEM_PER_PAGE);

        res.status(200).json({ totalProducts: count, products, pageCount });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product's data with the new information
        product.productName = req.body.productName || product.productName;
        product.quantity = req.body.quantity || product.quantity;
        product.price = req.body.price || product.price;
        product.discountType = req.body.discountType || product.discountType;

        if (req.file) {
            // If a new thumbnail is uploaded, update the productThumbnail field
            product.productThumbnail = req.file.path;
        }

        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

// GET request to fetch the details of a product by ID
const getParticularProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

module.exports = { createProduct, getProduct, updateProduct, getParticularProduct }



