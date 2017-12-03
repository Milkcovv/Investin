const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    set: function (value) {return value.trim().toLowerCase()},
  },
  email: {
    type: String,
    required: true,
    set: function(value) {return value.trim().toLowerCase()},
    validate: [
      function (email) {
        return validator.isEmail(email);
      }
    ]
  },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  bio:{
    type:String, required:true
  },  
  position:{
    type:String
  },  
  publication:{
    type:String
  },  
  homepage:{
    type:String
  },  

  linkedin:{
    type:String
  },  
  userType:{
    type:String, required:true
  },
  profilePermission:{
    type:Boolean, default:false
  },
  admin: { type: Boolean, default: true },
  thumbnail: String,
  avatar: { type: String, default: 'img/profile_img.png'},
  
});

module.exports = mongoose.model('User', userSchema);
