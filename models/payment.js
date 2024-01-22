const mongoose=require("mongoose")

const paymentSchema=mongoose.Schema({
    cartId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Cart",
   // required:true
    },
    paymentMethod:{
        type:String,
     required:true
    },
    PaymentIntendId:{
        type:String,
        require:true
    },
    amount:{
    type:Number,
    required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Payment=mongoose.model("Payment",paymentSchema)

module.exports=Payment