const express = require('express')
const router = express.Router()

const multer = require('multer')
// img storage path
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const { registerApi, loginApi, checkEmailExists, ChangePassword } = require('./controllers/userController')
const authMiddleware = require('./middleware/auth');
const { createProduct, getProduct, updateProduct, getParticularProduct } = require('./controllers/productController')


router.post('/register', upload.single('profileImage'), registerApi)
router.post('/login', loginApi)
router.post('/check-email-exists', checkEmailExists)
router.post('/change-password', ChangePassword);

router.post('/product', authMiddleware, upload.single('productThumbnail'), createProduct)
router.get('/products', authMiddleware, getProduct)
router.put('/product/:id', authMiddleware, upload.single('productThumbnail'), updateProduct)
router.get('/product/:id', authMiddleware, getParticularProduct)


module.exports = router;