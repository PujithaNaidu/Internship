const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "./../../.env"  });

modules.export=() =>{
    mongoose
  .connect("mongodb://localhost:27017/db1", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

}

 






