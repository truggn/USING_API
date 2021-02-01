const { required } = require("joi");
const router = require("express-promise-router")();// handle try catch
const {validateBody , validateParams, schemas } = require('../App/http/middleware/validate')
const auth = require('../App/http/middleware/authToken')

const loginController = require('../App/http/controllers/loginController');



        router.route('/register')
            .get(loginController.viewRegister)
            .post(validateBody(schemas.userSchema),loginController.postRegister)
        router.route('/login-page')
            .get(loginController.viewLogin)
            .post( validateBody(schemas.userSchemaPostLogin), loginController.postLoginPage)
         router.route('/:idUser/update')
            // .get( auth, lo_Reg_Con.viewUpdate)
            .post( auth ,validateBody(schemas.userSchema), validateParams(schemas.postLoginPage),loginController.patchUpdateUser)
        router.route('/refresh-token')
                .post(loginController.postToken);


module.exports = router;
