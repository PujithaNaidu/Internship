const Store=require('..models/store');

async function addtoDB(data){
    var new_store=new Store(data);
    try{
        await store.save();
        console.log('saving data');
    }
    catch(error){
        console.log(error);
    }
}