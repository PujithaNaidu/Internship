const mongoose = require('mongoose');
const Schema=new mongoose.Schema({
       storeName: String,
        accessToken: String,
        products: []
});
const store=mongoose.model('store',Schema);

module.exports=store;