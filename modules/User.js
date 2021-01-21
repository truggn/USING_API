const { invalid, required } = require('joi');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String , minleght: 2},
    Address:{type: String},
    email:{type:String ,default:''},
    password:{type:String, default:''},
    phoneNumber:{ type:Number},
    roles: {
            type: String,
            enum : ['user','admin'],
            default: 'user'
    },
    deleteAt: { type: Date, default: Date.now},
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }],
    logins: {type:mongoose.Schema.Types.ObjectId,
    ref: 'login'}
}, {
    collection: 'users'
});

UserSchema.pre("findOneAndUpdate", async function() {
    const docToUpdate = await this.model.findOne(this.getQuery());
  
    // add your hashing logic to here
    let newPassword = await bcrypt.hash(docToUpdate.password, 12);
  
    this.set({ password: newPassword });
  });
UserSchema.index({ email: 1}) // nơi đánh index, khóa chính của bảng user
module.exports  =  mongoose.model('User', UserSchema)
