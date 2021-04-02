const knex = require('../config/config').knex;
const bookshelf = require('bookshelf')(knex);
const cities=bookshelf.Model.extend({
    tableName:'cities'
});
module.exports=cities;