const productController = require('../controller/product_Con')

const {validateBody , validateParams, schemas } = require('../helper/validate')

const router = require("express-promise-router")();// handle try catch

router.route('/')
        .get(productController.viewProduct)
        // .post(validateBody(schemas.postproductSchema),productController.createNewProduct)

router.route('/:idProduct')
        .get(productController.viewProductById)
        .patch(productController.updateProduct)
        .put(validateBody(schemas.updateproductSchema), productController.putProduct)
        .delete(productController.xoaTamThoi)
router.route('/:idProduct/force')
        // .delete(productController.xoaVinhVien)
// router.route('/:idProduct/trash')
//         .get(productController.viewTrashProduct)

        
        
        

module.exports = router;