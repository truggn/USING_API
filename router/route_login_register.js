const { required } = require("joi");
const router = require("express-promise-router")();// handle try catch
const {validateBody , validateParams, schemas } = require('../helper/validate')
const auth = require('../middleware/authToken')

const lo_Reg_Con = require('../controller/login_Register_Con');
const login_Register_Con = require("../controller/login_Register_Con");


        router.route('/register')
            .get(lo_Reg_Con.viewRegister)
            .post(validateBody(schemas.userSchema),lo_Reg_Con.postRegister)
        router.route('/login-page')
            .get(lo_Reg_Con.viewLogin)
            .post( validateBody(schemas.userSchemaPostLogin), lo_Reg_Con.postLoginPage)
         router.route('/:idUser/update')
            // .get( auth, lo_Reg_Con.viewUpdate)
            .post( auth ,validateBody(schemas.userSchema), validateParams(schemas.postLoginPage),lo_Reg_Con.patchUpdateUser)
        router.route('/refresh-token')
                .post(login_Register_Con.postToken);

        router.route('/logout')
                .post(auth, lo_Reg_Con.logoutPage) // cần kiểm tra xem thời gian sống của token đó còn ko,

module.exports = router;
