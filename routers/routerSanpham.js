const productController = require('../App/http/controllers/productController')

const {validateBody , validateParams, schemas } = require('../App/http/middleware/validate')

const router = require("express-promise-router")();// handle try catch

router.route('/')
        .get(productController.viewProduct)
        // .post(validateBody(schemas.postproductSchema),productController.createNewProduct)

router.route('/:idProduct')
        .get(productController.viewProductById)
        .patch(productController.updateProduct)
        .put(validateBody(schemas.updateproductSchema), productController.putProduct)
        .delete(productController.xoaTamThoi)
    

module.exports = router;