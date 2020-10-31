const mongoose = require('mongoose');

//var uri2 = "mongodb+srv://UserMe:5d2jFfoEKe1d0tgO@cluster0.mfliq.mongodb.net/ToDoo?retryWrites=true&w=majority"

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true },{ useUnifiedTopology: true })
    .then({

    })
    .catch(err => {
        console.log(err);
    });
const db = mongoose.connection;
db.once('open',function(){
  console.log("db is connected.")
})

  
module.exports = mongoose;
