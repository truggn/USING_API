const User = require('../../../modules/User')
const Product = require('../../../modules/sanPham')
const {mongooseToObject, mutipleMongooseToObject} = require('../../../util/mongoose')
const { json } = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class homeController{   
    async home(req, res, next){
        try { 
            await Product.find({})
                        .then((datas) => {res.status(200).render('home/index', { datas: mutipleMongooseToObject(datas), layout: 'layouts/layout'} )})
                        .catch(next)                                           
           } catch (error) {
              next(error)
              }
        
    }
    // GET VIEW HOME
//     async home(req, res, next){
//         try { 
//             await Product.find({})
//                           .then((data) => {res.render('home/index', {
//                                   listProducts: mutipleMongooseToObject(data)} , {layout: 'layouts/layout'} )})
//                                                   .catch(next) 
                                                 
//            } catch (error) {
//               next(error)
//               }
// }
 // GET ID USER 
    async getIdUser(req, res, next){
       try {
        const {userId} = req.value.params  
        const getUserbyId = await User.findById(userId)
            return res.status(200).json(getUserbyId)
       } catch (error) {
           next(error)
       }
 }
 // UPDATE USER 
    async replaceUser(req, res, next){
        // thay thế tất cả các trường 
        const {userId} = req.value.params

        const newUser = req.value.body

                 await User.findByIdAndUpdate(userId , newUser) // tim cac ban ghi theo Id

        return res.status(200).json({succsess: true})
 }
// REPLACE USER 
    async updateUser(req, res, next){   
        // cập nhật giá trị của user
        // const {userId} = req.value.params,

        


        // const result = await User.findByIdAndUpdate(userId, {}, { new: true });

        // res.send(result);


       // check xem Email da ton tai chua
        // await User.findOne({email: email} , ((error, Emailuser)=>{
        //     if(Emailuser != null){
        //             // check neu Email da ton tai 
        //             res.status(401).json("Email đã tồn tại")
        //             return;
        //     }else{
        //           User.findByIdAndUpdate({userId: userId  } ,((error, newupdate)=>{
        //                if(error){
        //                    console.log(error)
        //                    return;
        //                }else{
        //                    res.status(200).json(newupdate)
        //                }
        //            }))
        //     }
        // })) 

    //  await User.findByIdAndUpdate(userId , newdata , ((error)=>{
    //         if(error){console.log(error)}else{res.status(200).json(newdata)}
    //  }))

 }
// DELETE USER
    async deleteUser(req, res, next){
     const {userId} = req.value.params
     const user = req.value.body
             await User.deleteOne(userId , user)
     return status(200).json({succsess: true})
 }
// GET USER DESK
async viewCart_Of_User(req, res, next){
         const {userId } = req.value.params
         const user = await User.findById(userId).populate('owner')
         return res.status(200).json(user.user)
 }
//CREATE CART OF USER
async createCart_Of_User(req, res, next){
    // try {
    //     const {userId} = req.value.params
    //     // tạo mới 1 hóa đơn 
    //     const newHoaDon = new hoaDon(req.body)
    //     // lấy thông tin user sở hữu cái hóa đơn đó.
    //     const user = await User.findById(userId)

    //     // gán cái hóa đơn đó cho thằng user đã lấy id
    //     newHoaDon.user = user 

    //     // Save hóa đơn đó lại 
    //     await newHoaDon.save()

    //     // đẩy cái id hóa đơn đó vào cho thằng user.
    //     user.hoaDon.push(newHoaDon._id)
    //     // sau khi push giá trị mới vào thì ta phải lưu lại cho nó
    //     await user.save()
    //     return res.json(newHoaDon)

    // } catch (error) {
    //     next(error)
    // }
 }
// DELETE DESK
async deleteDesk(req, res, next){
//  try {
//     const {userId} = req.params
//      // tao bien chua danh sach cac user can xoa desk do
//     const { idDesk } = req.params

//     // lay user so huu cai desk do
//     const userDeck = await User.findById(userId)
//     console.log("useId", userId)
//     const Deskid = await Deck.findById(idDesk)
//     console.log("iddesk lay ra" , Deskid)
//     return;


//     Deck.owner = userDesk

//     await Deck.deleteOne()

//     userDeck.desks.deleteOne(userDeck._id)

//     await userDeck.save()

//         return res.status(200).json({
//             message: "delete succseccful"
//         })
//  } catch (error) {
//      next(error)
//  }
 }
// VIEW DECKOF USER
async message(req, res, next){
   res.status(200).render('home/chat')
 }
// UPDATE CART OF USER
async updateCart_Of_User(){
 }
// VIEW DESKBYID


}

module.exports = new homeController;
