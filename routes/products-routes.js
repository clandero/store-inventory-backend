const express = require('express')
const productsController = require('../controllers/products-controller');
const utils = require('../utils/jwt-utils');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', utils.authenticateJWT, productsController.getAllProducts);
router.get('/category/:cid', utils.authenticateJWT, productsController.getProductsByCategory);
router.get('/name/:pname', utils.authenticateJWT, productsController.getProductsByName);

router.post('/', 
    utils.authenticateJWT, 
    [
        check('name').not().isEmpty().isString(),
        //check('category').not().isEmpty().isArray(),
        check('price').not().isEmpty().isInt(),
        check('stock').not().isEmpty().isInt()
    ],
    productsController.addNewProduct
);

router.patch('/', 
    utils.authenticateJWT, 
    [
        check('id').not().isEmpty()
    ],
    productsController.updateProductByid
);

router.delete('/', 
    utils.authenticateJWT, 
    [
        check('id').not().isEmpty()
    ],
    productsController.deleteProductById);

module.exports = router;