// CONTROLLER SỬ LÝ QUẢN LÝ PAGE CỦA ADMIN
const Product = require('../../../modules/sanPham')
const {mongooseToObject, mutipleMongooseToObject} = require('../../../util/mongoose');

class adminController{
    //VIEW PAGE ADMIN
    async pageAdmin(req, res, next){
        try { 
            await Product.find({})
                        .then((dataSP) => {res.status(200).render('admin/index', { dataSP: mutipleMongooseToObject(dataSP), layout: 'layouts/layout_admin'} )})
                        .catch(next)                                           
           } catch (error) {
              next(error)
              }
    };

    // POST THEM MON MOI
    async themMon(req, res, next){
        const monMoi = new Product(req.value.body)  
        await monMoi.save().then((data, error)=>{      
               return res.status(200).json({data})
        }).catch(error =>{
            console.log(error)
        })
    };

// METHOD DELETE MON
    async deleteMon(req, res , next){
                try {
                    Product.delete({idMon: req.params._id}).then(() =>{
                        return res.status(200).redirect('back')
                    }).catch(next);    
        } catch (error) {
           console.log(error)
        }
    };
// DELETE VINH VIEN MON
    async destroy(req, res, next){
        try {
            Product.deleteOne({idMon: req.params._id}).then(()=>{
                return res.status(200).redirect('back')
            }).catch(error)
        } catch (error) {
                console.log(error)
        }
    }

    // PATCH REVERT DATA
    async phuchoiData(req,res, next){
        // truyen idSP can phuc hoi
        const{idMon} = req.body.params
        Product.restore(idMon)
        .then(()=> res.redirect('back'))
        .catch(next);
    };

    // VIEW UPDATE MÓN
    async viewUpdateMon(){
    
    };

    // PATCH UPDATE MON
    async edit(req, res, next){
        await Product.updateOne({ id: req.params._id}, req.body).then(()=>{
            res.redirect('back')
        })
    };
    // POST LOGOUT-PAGE
    async logoutPage(req, res, next){
        try {
            req.user.tokens.splice(0 , req.user.tokens.length)
            await req.user.save()
            res.status(200).redirect('/login-page')
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = new adminController;