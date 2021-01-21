const joi = require('joi')


const validateBody = (schema) =>{
    return (req, res, next) => {
        const resultValidate = schema.validate(req.body)
        if(resultValidate.error){
            return res.status(404).json(resultValidate.error)
        }else{
            if(!req.value) req.value = {} 
            if(!req.value['params']) req.value.params = {}

            req.value.body = resultValidate.value

            next();       
        }
    }
}

const validateParams = (schema, name) =>{
        return (req, res, next) =>{
            const ValidateResult = schema.validate({param:  req.params[name]})
            if(ValidateResult.error){
                    // check neu co err thi lam gi do
                    return res.status(400).json(ValidateResult.error)
            }else{
                if(!req.value) req.value = {}  
                if(!req.value['params']) req.value.params = {}
                req.value.params[name] = req.params[name]
                next();
            }
        }
}
const schemas = {
    idSchema: joi.object({
        param:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{24}$')).required()
    }),
    userSchema: joi.object().keys({
        username:   joi.string().min(2).required(),
        Address:    joi.string().min(2),
        email:      joi.string().email().required(),
        password:   joi.string().regex(/^[a-zA-Z0-9]{5,20}$/).required(),
        phoneNumber: joi.number().min(10),
        role: joi.string()
    }),
    userSchemaPostLogin: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
    }),
    userSchemaUpdate: joi.object().keys({
        username:   joi.string().min(2),
        Address:    joi.string().min(2),
        email:      joi.string().email(),
        password:   joi.string().min(3),
        phoneNumber: joi.number().min(10)
    }),
    userSchemaHoaDon: joi.object().keys({
        tongTien: joi.number().min(0),
        soLuong: joi.number().min(0),
        toTal: joi.number().min(0)
    }),
    postproductSchema: joi.object().keys({
        tenMon: joi.string().min(5).required(),
        donGia: joi.number().min(0).required(),
        moTa: joi.string().min(5).required(),
        hinhAnh: joi.string().min(1)

    }),
    updateproductSchema: joi.object().keys({
        tenMon: joi.string().min(5),
        tieuDe: joi.string().min(5),
        donGia: joi.number().min(0),
        moTa: joi.string().max(100),
        hinhAnh: joi.string()
    }),
    createLoaiSanPham : joi.object().keys({
        tenLoai:  joi.string().min(3).required(),
        moTa: joi.string().max(100).required()
    })

    
};

module.exports  = {
    validateParams,
    validateBody,
    schemas
}