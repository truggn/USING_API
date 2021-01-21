const homeRoute = require('./route_home')
const productRoute = require('./route_product')
const loaiSP = require('../router/route_loaiSP')
const adminRoute = require('./route_admin')
const login_Register_Route = require('./route_login_register')
const auth = require('../middleware/authToken')



function router(app){
    app.use('/san-pham',productRoute)
    app.use('/loai-san-pham', loaiSP)
    app.use('/trang-chu', homeRoute)
    app.use('/page-admin', auth, adminRoute)
    app.use('/', login_Register_Route)
}

module.exports = router;