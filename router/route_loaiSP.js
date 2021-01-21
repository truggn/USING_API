const loaiSPCON = require('../controller/loaiSanPham_Con')

const {validateBody , validateParams, schemas } = require('../helper/validate')

const router = require("express-promise-router")();

router.route('/')
        .get(loaiSPCON.viewLoai)
        .post(validateBody(schemas.createLoaiSanPham),loaiSPCON.createLoaiSanPham)

router.route('/:idLoaiSanPham')
        .patch(loaiSPCON.updateLoaiSanPham)

        
        
        

module.exports = router;