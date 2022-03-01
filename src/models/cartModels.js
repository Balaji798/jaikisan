const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({

    cartNumber:{type:String},

    cartType:{type:String,required:true,trim:true,enum:["REGULAR","SPECIAL"]},

   customerName:{type:String,required:true,trim:true},

    status:{type:String,trim:true},

    vision:{type:String,required:true,trim:true},

    customerID:{type:String,required:true}

},
    { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)