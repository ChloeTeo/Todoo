const mongoose = require('mongoose');
//const config = require('config');
var uri = "mongodb://127.0.0.1:27017/TODOO";
var uri2 = "mongodb+srv://UserMe:5d2jFfoEKe1d0tgO@cluster0.mfliq.mongodb.net/ToDoo?retryWrites=true&w=majority"
//mongoose.connect(`mongodb://${config.get('db.host')}:${config.get('db.port')}/${config.get('db.dbName')}`,
  //{ useNewUrlParser: true });
//mongoose.connect(uri2,{useNewUrlParser: true }, { useUnifiedTopology: true });
mongoose.connect(uri2, { useNewUrlParser: true },{ useUnifiedTopology: true })
    .then({

    })
    .catch(err => {
        console.log(err);
    });
const db = mongoose.connection;
db.once('open',function(){
  console.log("db is connected.")
})

/*var schema = new mongoose.Schema({
  date : {type : String}
}, {collection: "Todo"});

var model1 = mongoose.model('model1', schema);

model1.find()
  .then((todo) =>{
    console.log(todo)
  })
  .catch((err) =>{
    console.log(err)
  })
  */
  
module.exports = mongoose;
