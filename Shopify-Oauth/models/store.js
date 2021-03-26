const mongoose = require('mongoose');
const schema=new mongoose.Schema({
        storeName: String,
        accessToken: String,
        products: []
});
const store=mongoose.model('store',schema);

module.exports=store;