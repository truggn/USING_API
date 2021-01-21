require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyPaser = require('body-parser')
const db = require('./config/db')
const morgan = require('morgan')
const methodOverride = require('method-override')
const expressEjsLayouts = require('express-ejs-layouts')
var flash = require('connect-flash');
var session = require('express-session');
const passport = require('passport')


// connecting DB
db.connect()
const app = express()
// Listen ON CONNECTION SEREVR

// Middlewares
app.use(morgan('dev'))
app.use(bodyPaser.json())
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.use(flash());



// Set View Engine 
app.set('view engine' , 'ejs')
app.set('layout', 'layouts');
app.use(expressEjsLayouts)

app.set('views' , path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

// SESSION
app.use(session({ 
    cookie: {expires: false},
    secret: 'trungviSecrect',
    resave: true,
    rolling: false,
    saveUninitialized: false}));

// Router.
const router = require('./router')
router(app)
app.get('/' , (req , res , next) =>{
    return res.status(200).json({
        message: ' Server is OK'
    })
})

// Error 404.
app.use((req , res, next) =>{
    const err = new Error('Not Found!')
    err.status = 404
    next(err)
})

// Function Handle Error.
app.use((err, req, res, next)=>{
    const error  = app.get('env') === 'development' ? err: {}
    const status  = err.status || 500 // tat ca cac err ko xac dinh thi tra ve 500
    // tra ve cho client 
    return res.status(status).json({
        error:{
            message: error.message
        }
    })
})

// Start Server 
const port  = app.get('port') || 3030
app.listen(port, () => console.log(`Server is listening on port ${port}`))