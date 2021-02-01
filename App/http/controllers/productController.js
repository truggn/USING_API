// CONTROLLER XỬ LÝ CRUD SẢN PHẨM.
const Product = require('../../../modules/sanPham')

const {mongooseToObject, mutipleMongooseToObject} = require('../../../util/mongoose');
const { json } = require('body-parser');

class productController{

    //GET VIEW LIST PRODUCTS
    async viewProduct(req, res, next){
    try { 
      await Product.find({}).populate('loaiSanPham')
                    .then((data) => {res.status(200).json(data)})
                                            .catch(next) 
                                           
     } catch (error) {
        next(error)
        }
    };

    // POST CREATE NEW PRODUCTS
    // async createNewProduct(req, res, next){
       
    //     try {
    //         const newProduct = Product.save().then(result =>{
                    
    //         })
    //     } catch (error) {
            
    //     }
           
    // };
    // VIEW  PRODUCTByID
    async viewProductById(req, res, next){
      try {
        const {idProduct} = req.params
        const viewsanPham = req.body
        const result = await Product.findById(idProduct, viewsanPham)
            if(!result){
                return res.status(201).json({
                    message: `Không tìm thấy sản phẩm có Id là: ${idProduct}`
                })
            }else{
                return  res.status(200).json(result)
            }
        
      } catch (error) {
          next(error)
      }
    }
    // UPDATE PRODUCT
    async updateProduct(req, res, next){
        const {idProduct} = req.params
        const layProduct= req.body
        if(idProduct != req.body._id){
            res.status(404).json({
                message: "Không tồn tại Sản phẩm có IdSanPham là:" ,  idProduct
            })
        }else{
        const newUpdate =    await Product.findByIdAndUpdate(idProduct,layProduct)
                res.status(400).json(newUpdate)
        }
    };
    // DELETE PRODUCT 
    async xoaVinhVien(req, res, next){
       try {
        const{ idProduct } = req.params
        const xoaVinhVienProduct = req.body
                  await Product.deleteOne(idProduct , xoaVinhVienProduct)
                return res.status(200).json({
                    succsess: true
                })
       } catch (error) {
           next(error)
       }
    }
    // XOA TẠM THỜI
    async xoaTamThoi(req, res, next){
        try {
                    Product.findOneAndDelete({idProduct: req.params._id })
                 return res.status(200).redirect('back')
        } catch (error) {
            next(error)
        }
     }
    // // VIEW TRASH PRODUCT
    // async viewTrashProduct(req, res, next){
        
    // }
    // PUT PRODUCT
    async putProduct(req, res, next){
             // thay 1 trường
             try{
             const {idProduct} = req.value.params

             const patchupdateProduct = req.value.body
 
                 const updateNew =   await Product.findByIdAndUpdate(idProduct , patchupdateProduct) // tim cac ban ghi theo Id
 
                    return res.status(200).json(updateNew)
         } catch (error) {
             next(error)
         }   
    // DELETEFORCE PRODUCT

  
}
}
module.exports = new productController;