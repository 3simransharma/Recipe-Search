const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Recipe Name"],
        trim:true
    },
    category:{
        type:String,
        required:[true,"Please Define Category"],
    },
    tags:[{
        name:{
            type:String,
        },
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Food",foodSchema);