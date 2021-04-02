var knex=require('../config/config').knex;
const winston = require('winston');

const cities = require('../models/schema');

async function save_city(name,population) {

    try {

        let val = await cities.forge({ 'name':name, 'population':population}).save();
        console.log(val.toJSON());
        return val;
    } catch (e) {

        console.log(`Failed to save data: ${e}`);
    } finally {

        knex.destroy();
    }
}

async function get_allusers() {

    try {

        let vals = await cities.fetchAll();
        // console.log(vals.toJSON());
        return vals;
    } catch (e) {

        console.log(`Failed to fetch data: ${e}`);
    } finally {

        knex.destroy();
    }
}



async function fetch_city(name) {

    try {

        let val = await cities.where({ 'name': name}).fetch({require:true});
        // console.log(vals.toJSON());
       return val;
    } catch (e) {

        console.log(`Failed to fetch data: ${e}`);
    } finally {

        knex.destroy();
    }
}

async function updateuser(userid, userinfo) {
    try {
        console.log(userid);
        let employees = await cities.where('id', userid).save(userinfo, { patch: true });
        console.log(employees.toJSON());
        return { status: 200, data: "successfully updated!" };
    } catch (e) {
        console.log(e);
        if (e.message == "No Rows Updated") {
            return { status: 400, data: "No matching record found to update." }
        }
        return { status: 400, data: "update failed." };
    }

}

async function deleteUser(userid) {
    try {
        console.log(userid);
        let user = await cities.where('id', userid).destroy();
        console.log(user.toJSON());
        return { status: 200, data: "successfully deleted!" };
    } catch (e) {
        if (e.message == "No Rows Deleted") {
            return { status: 400, data: "No matching record found." }
        }
        return { status: 400, data: "failed to delete" };
    }

};

module.exports={save_city, get_allusers,fetch_city,updateuser,deleteUser};

