
const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);



const Schema = mongoose.Schema;
const loaiSanPham = new Schema({
  _idLoaiSanPham: {type: Number},
    tenLoai: {type:String},
    mota:{type:String}
},{
    timestamps: true,
    _id: false
}
)
// add plugin
loaiSanPham.plugin(AutoIncrement, {id: '_idLoaiSanPham'}) 
// mongoose.plugin(slug);
loaiSanPham.plugin(mongooseDelete , {
  deletedAt: true,
  overrideMethods: "all"});
module.exports  =  mongoose.model('loaiSanPham', loaiSanPham)
