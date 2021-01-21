const loaiSanPham = require('../modules/loaiSanPham')
const {mongooseToObject, mutipleMongooseToObject} = require('../util/mongoose');

class loaiSanPhamConTroller{
        // GET VIEW LOAI SAN PHAM 
    async viewLoai(req, res, next){
        await loaiSanPham.find().then((dataLoais) =>{
            res.status(200).render('admin/index', {dataLoais})
        })
    }
      // CREATE LOẠI SẢN PHẨM 
      async createLoaiSanPham(req, res, next){
        try {
            const newLoai = new loaiSanPham(req.value.body)
                await newLoai.save().then((loai)=>{
                    res.status(200).render({
                        loai: mutipleMongooseToObject(loai)
                    })
                }).catch(next)
        } catch (error) {
            next(error)
        }
    }
    // PATCH UPDATE LOAI SAN PHAM 
    async updateLoaiSanPham(req, res, next){
        // try {
        //     const{idLoaiSanPham} = req.params
        //     console.log(idLoaiSanPham)
        //      await loaiSanPham.findByIdAndUpdate({idLoaiSanPham}).then((loaiDaUpdate) =>{
        //         res.status(200).json(loaiDaUpdate)
        //     }).catch(next)
        // } catch (error) {
        //     console.log(error)
        // }
    }

}
module.exports = new loaiSanPhamConTroller;