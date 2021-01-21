module.exports= {
    // ham xu ly array
    mutipleMongooseToObject: function(mongoose){
        return mongoose.map(mongoose => mongoose.toObject());
    },
    // ham xu ly chi tiet 
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    },

};
