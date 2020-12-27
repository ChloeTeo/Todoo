const mongoose = require('mongoose');

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
