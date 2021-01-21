// CONTROLLER XỬ LÝ LOGIN CỦA USER
const User = require('../modules/User')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const _CONF = require('../config/secret')
const utils = require('../util/utils');
const {mongooseToObject, mutipleMongooseToObject} = require('../util/mongoose');



// tao 1 Object luu nhung RefershToken 
const token_list = {};
//const secrect = require('../config/secret')

class loginController{
    
    // GET VIEW LOGIN 
    async viewLogin(req, res, next){
        res.render('home/login_page', {
            layout: 'layouts/layout_login_register',
            title:'Login',
            message: req.flash('message')
      });
    }

    //GET VIEW REGISTER
    async viewRegister(req, res, next){
        res.render('home/register', {
            layout: 'layouts/layout_login_register',
            title:'Register',
            messageRegister: req.flash('messageRegister')
        })
    }

    //POST RegisterNEW USER
    async postRegister(req, res, next){
        const { email, password } = req.value.body
        try {
         await User.findOne({email: email} , (error, user) =>{
                if(user == null){ // kiểm tra xem email đã được sử dụng hay chưa
                    bcrypt.hash(password, 10 , function(error , hash){// Mã hóa mật khẩu trước khi lưu vào db
                        if(error){
                            return res.status(404).json(error);
                        }
                        const user = new User(req.value.body)
                        user.password = hash;
                        user.save()
                        .then( () => res.status(200).redirect('login-page'))
                        .catch(Error =>{
                            next(error)
                        })
                    })
                }else{
                    req.flash('messageRegister','Email đã tồn tại! Vui lòng nhập Email khác.')
                    return res.redirect('back')
                }
            })
        } catch (error) {
            next(error)
        }

    }

   // METHOD POST LOGIN PAGE
    async postLoginPage(req, res, next){ 
        const {email, password , token} = req.value.body
        try {
            const user = await User.findOne({email:email})
            if(!user){
                req.flash('message','Email không tồn tại!')
                return res.redirect('back')
                 } 
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                 req.flash('message', 'Mật khẩu không đúng!')
                 return res.redirect('back')
                } 
                const token = jwt.sign({id: user._id}, _CONF.secret , {expiresIn: _CONF.tokenLife})
                user.tokens = user.tokens.splice(1) // xóa đi phần tử token dầu tiên
                user.tokens = user.tokens.concat({token}) // gán lại token sau khi login lại
                 await user.save().then((data, error)=>{
                     if(error){
                         return res.status(400).json("ERROR")
                    }else{
                        if(data.roles == 'admin'){
                            res.cookie('token', token, { maxAge: 900000, httpOnly: true, expires: false })
                            return res.status(200).redirect('page-admin/san-pham')
                        }else{   
                            return res.status(200).redirect('trang-chu')
                        }
                    } 
                     }).catch(error =>{
                         return res.status(500).json("ERROR SERVER")
                        }) 
        // // // // Tạo mới mã refresh token mới.
        // const ref_token = jwt.sign({id: user._id},_CONF.secret , {expiresIn: _CONF.refreshTokenLife});
        // token_list[ref_token]= user;  // Lưu lại mã Refresh token, kèm thông tin của user để sau này sử dụng lại.

        // //Trả lại cho user thông tin mã token kèm theo mã Refresh token
        // const response = {
        //     "Status" : " Logged in ",
        //     "token": token,
        //     "refershToken" : ref_token,
        // }  
        } catch (e) {
          console.error(e);
         return res.status(500).json({
              message: " Server Lỗi"
          })  
         }
    }
    /* Get new token when jwt expired . */
    async postToken(req, res){
        // User mã referesh token kèm theo trong body
        const {ref_token} = req.body
        // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không 
        if((ref_token) && (ref_token in token_list)){
            try {
                // kiểm tra lại mã refresh token
                await utils.verifyJwtToken(ref_token , _CONF.refreshTokenSecret)
                // lấy lại thông tin user 
                const user = token_list[ref_token];
                // tạo mới token và trả lại cho người dùng
                const token = jwt.sign(user , _CONF.secret, {
                    expiresIn: _CONF.tokenLife
                })
                const response = {
                    token
                }
                res.status(200).json(response)
            } catch (error) {
                console.error(error)
                res.status(403).json({
                    message: "Invalid refresh token"
                });
            }
        }else{
            res.status(400).json({
                message: 'Invalda request'
            })
        }
       
    }
    //PATCH UPDATE USER 
    async patchUpdateUser(req, res, next){
            // try {
            //     const {userId} = req.value.params
            //     const password = req.value.body
            //     console.log(" passs" , password)
            //     // check password 
            //     // const layPass = await User.findOne({password: password}, (error, password)=>{
            //     //     if(layPass != password){
            //     //         res.status(401).json("Not null password")
            //     //     }else{

            //     //     }
            //     // })
            // } catch (error) {
                
            // }
    }
    // POST LOGOUT
    async logoutPage(req, res, next){
        const token  = req.header('auth-token')
        console.log("abc")      
}   
}
module.exports = new loginController;