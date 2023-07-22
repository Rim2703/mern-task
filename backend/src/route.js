const express = require('express')
const router = express.Router()
const multer = require('multer');
// img storage path
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const { registerApi, loginApi, ChangePassword } = require('./controllers/userController')
const authMiddleware = require('./middleware/auth');
const { createProduct, getProduct } = require('./controllers/productController')


router.post('/register', registerApi)
router.post('/login', loginApi)
router.post('/change-password', authMiddleware, ChangePassword)
router.post('/product', authMiddleware, upload.single('productThumbnail'), createProduct);
router.get('/products', authMiddleware, getProduct)

module.exports = router;