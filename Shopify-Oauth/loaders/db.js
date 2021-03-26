const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "./../../.env"  });

module.exports=() =>{
    mongoose
  .connect("mongodb://localhost:27017/shopify", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(console.log('DB connection successful!'))
  .catch()

}

 






