const knex =require('knex')({
    client: 'pg',
    version: '4.26',
    connection:{
    host: '127.0.0.1',
    user:'postgres',
    password:'1234',
    port:5432,
    database:"test",
    char:'utf8'
    }
});

module.exports.knex=knex;