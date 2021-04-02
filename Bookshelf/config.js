const Client=require('pg').Client

const client =new Client({
    user:'postgres',
    password:'1234',
    port:5432,
    database:"test"
})
client.connect()
.then(() => console.log("Connection is scuccessfull"))
.then(() => client.query("select  * from fisrt_tab"))
.then(results => console.table(results.rows))
.catch(e=> console.log(e))

module.exports={config}