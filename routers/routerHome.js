const { required } = require('joi');
const homeController = require('../App/http/controllers/homeController');
const router = require("express-promise-router")();// handle try catch
const {validateBody , validateParams, schemas } = require('../App/http/middleware/validate')
const auth = require('../App/http/middleware/authToken')




router.route('/')
        .get(homeController.home)

router.route('/message')
        .get(homeController.message)

router.route('/:userId')
        .get(validateParams(schemas.idSchema , 'userId'), homeController.getIdUser)
        .put(validateParams(schemas.idSchema , 'userId'),validateBody(schemas.userSchema), homeController.replaceUser)// PUT Them data
        .patch(validateParams(schemas.idSchema, 'userId'),validateBody(schemas.userSchemaUpdate),homeController.updateUser)// PATCH lại data
        .delete(homeController.deleteUser),

router.route('/:userId/hoa-don')
        .get(homeController.viewCart_Of_User)
        .post(validateParams(schemas.idSchema , 'userId'),validateBody(schemas.userSchemaHoaDon) ,homeController.createCart_Of_User)
        .patch(homeController.updateCart_Of_User)



module.exports = router;