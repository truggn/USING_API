require('dotenv').config()
const express = require('express')
const path = require('path')
const handlebars = require("handlebars")
const db = require('./configdb/db');

const logger = require('morgan')

const app = express()

// Middlewares
app.use(logger('dev'))

// Set View Engine
// template engine, 
app.engine('hbs' , handlebars({
    extname: '.hbs',
    defaultView: 'main',
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/partial/',

    })
);
app.set('view engine' , 'hbs');
app.set('views' , path.join(__dirname,'views'));

// Router.
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
app.use(()=>{
    const error  = app.get('env') === 'development' ? err: {}
    const status  = err.status || 500 // tat ca cac err ko xac dinh thi tra ve 500

    // tra ve cho client 
    return res.status(status).json({
        error:{
            message: error.message
        }
    })
})

// connect to db 
//db.connect();

// Start Server 
const port  = app.get('port') || 3000

app.listen(port, () => console.log(`Server is listening on port ${port}`))