
const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var moment = require('moment'); // require
var now = moment();
var Float = require('mongoose-float').loadType(mongoose);



const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    _idProduct: {type:Number},
    tenMon: {type:String},
    donGia:     {type: Float},
    hinhAnh:    {type:String},
    moTa:       { type:String},
    giamGia:    {type: Number},
    deleteAt: { type: String, default: now.format('YYYY/MM/DD')},
    createAt: { type: String, default: now.format('YYYY/MM/DD')},
    updateAt: { type: String, default: now.format('YYYY/MM/DD')},
    loaiSanPham: [{
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'loaisanPham'
  }],
},{
    _id: false,
    timestamps: true,
}
)
// add plugin
ProductSchema.plugin(AutoIncrement);

// mongoose.plugin(slug);
ProductSchema.plugin(mongooseDelete , {
  deletedAt: true,
  overrideMethods: "all"});
module.exports  =  mongoose.model('product', ProductSchema)
