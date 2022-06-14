const mongoose=require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type:String, 
        required:true,
    },
    username: {
        type:String, 
        required:true,
        unique:true
    },

    password: {
        type:String, 
        required:true,
    },
    imgURL: {
        type:String, 
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
});
User=mongoose.model('user', UserSchema);
// User.createIndexes();
module.exports = User