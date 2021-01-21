// CONTROLLER SỬ LÝ QUẢN LÝ PAGE CỦA ADMIN
const Product = require('../modules/sanPham')
const {mongooseToObject, mutipleMongooseToObject} = require('../util/mongoose');

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
        await monMoi.save().then(()=>{      
                res.status(200).redirect('back')
        }).catch(next)
    };

// METHOD DELETE MON
    async deleteMon(req, res , next){
                try {
                    Product.findOneAndDelete({idMon: req.params._id })
                 return res.status(200).redirect('back')
        } catch (error) {
            next(error)
        }
    };

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


}
module.exports = new adminController;