const mongoose = require('../module/mongoose');

const LocalUser = mongoose.model('LocalUser', {
    id: String,
    name: String,
    loginType : String,
    password: String,
  });
  
  const GoogleUser = mongoose.model('GoogleUser',{
    id: String,
    name: String,
    email: String,
  })
  
  module.exports = {
      LocalUser,
      GoogleUser
  }