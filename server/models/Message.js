const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    type: Schema.Types.ObjectId,
    name: { type: String, trim: true, required:true },
    message: { type:String, trim: true },
},
{
    timestamps:true
});


const Message = mongoose.model('messages', messageSchema);

module.exports =Message;