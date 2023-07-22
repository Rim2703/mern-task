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



// const getProduct = async (req, res) => {

//     try {
//         const userId = req.user.userId;

//         // Fetch products for the logged-in user using the user ID
//         const products = await Product.find({ userId });

//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error', msg: error.message });
//     }
// }


const getProduct = async (req, res) => {
    try {
        const userId = req.user.userId;
        let { sortBy, searchTerm } = req.query;

        // Create a query object to find products for the logged-in user
        const query = { userId };

        // Handle search functionality (if searchTerm is provided)
        if (searchTerm) {
            // Use case-insensitive regex to match the productName field
            query.productName = { $regex: new RegExp(searchTerm, 'i') };
        }

        // Create a sort object based on the sortBy parameter
        let sort = {};
        if (sortBy === 'asc') {
            sort = { productName: 1 }; // Sort in ascending order by productName
        } else if (sortBy === 'desc') {
            sort = { productName: -1 }; // Sort in descending order by productName
        }

        // Fetch products based on the query and sort
        const products = await Product.find(query).sort(sort);
        //   console.log(products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message })
    }
}


module.exports = { createProduct, getProduct }



