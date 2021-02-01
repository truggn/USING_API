const homeRoute = require('./routerHome')
const productRoute = require('./routerSanpham')
const adminRoute = require('./routerAdmin')
const login = require('./routerLogin')
const auth = require('../App/http/middleware/authToken')



function router(app){
    app.use('/san-pham',productRoute)
    app.use('/trang-chu', homeRoute)
    app.use('/page-admin', adminRoute)
    app.use('/', login)
}

module.exports = router;