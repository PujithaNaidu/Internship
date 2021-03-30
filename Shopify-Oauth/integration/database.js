const axios = require('axios')
const request = require('request-promise');
const Shopify = require('../models/store')
const Products  = require('../models/products')
exports.getAccessToken = async (shop, accessTokenRequestUrl, accessTokenPayload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const accessTokenResponse = await request.post(accessTokenRequestUrl, { json: accessTokenPayload })
            const accessToken = accessTokenResponse.access_token;
            const shopRequestUrl = 'https://' + shop + '/admin/api/2021-01/shop.json';
            const shopRequestHeaders = {
              'X-Shopify-Access-Token': accessToken,
            };
            console.log('A', accessToken)
            const obj = new Shopify({
                shopName : shop,
                accessToken : accessToken
            })
            try {
                const res = await obj.save();
                // console.log("Added the access token", res)
            } catch (error) {
                // console.log('Error while adding the access token', error)
                return reject(error)                
            }
            options = {
                method : 'GET',
                headers : shopRequestHeaders, 
                url : shopRequestUrl,
            }
            const shopResponse = await axios(options)
            return resolve(shopResponse.data)
        } catch (error) {
            return reject(error)
        }
    })
}

exports.getProducts = async (url, shop) => {
        console.log(shop,url,"three")
        return new Promise(async (resolve, reject) => {
            let document;
            try {
                document = await Shopify.findOne({shopName : shop}) 
                if(!document){
                    return reject("install app")
                }
                console.log(" got document", document)
            } catch (error) {
                console.log("error", error, error.message)
                return reject("Invalid shop name")
    
            }
            try {
                const products = await Products.find({})
                return resolve(products)
            } catch (error) {
                return reject(error.message)
            }
        })
    }

exports.addProduct = async (url, shop, product) => {
    return new Promise (async (resolve, reject) => {
        let document;
        try {
            document = await Shopify.findOne({shopName : shop}) 
            if(!document){
                return reject("install app")
            }
            console.log(" add document", document)
        } catch (error) {
            return reject("Invalid shop name")
        }
        try {
            const options = {
                method : "POST",
                headers : {
                    'X-Shopify-Access-Token' : document['accessToken'],
                    'content-type' : 'application/json',
                },
                url : url,
                data : { product : product }
            }
            const productResponse = await axios(options)
            console.log('Added Product', productResponse.data)
            let pro = productResponse.data;
            try {
                const d = await Products.create({
                    "product" : pro.product,
                    "_id" : pro.product.id
                })
                console.log('Addedn product to the datagbase', d)
            } catch (error) {
                console.log("error adding product to db", error.message)
            }
            return resolve(productResponse.data)
        } catch (error) {
            return reject(error.message)
        }
    })
    .catch((err) => {
        console.log('error while adding the product', err.message, err)
    })
}

exports.updateProduct = async (url, shop, product, productId) => {
    return new Promise(async (resolve, reject) => {
        let document;
        try {
            document = await Shopify.findOne({shopName : shop}) 
            if(!document){
                return reject("install app")
            }
        } catch (error) {
            return reject("Invalid shop name")
        }
        const options = {
            method : 'PUT',
            headers : {
                'X-Shopify-Access-Token' : document['accessToken'],
                'content-type' : 'application/json',
            },
            url : url,
            data : { product : product }
        }
        try {
            const updatedProductResponse = await axios(options)
            // console.log('Updated Product 1', updatedProductResponse.data)
            const updated = await Products.findByIdAndUpdate(productId, 
                {$set:updatedProductResponse.data}, {new: true}
                )
            return resolve(updated)
        } catch (error) {
            console.log('error while updating product 1', error)
            return reject(error.message)            
        }
    })
    .catch((error) => {
        console.log('Error while updating the product', error.message, error);
    })
}

exports.deleteProduct = async (url, shop, productId) => {
    return new Promise(async (resolve, reject) => {
        let document;
        try {
            document = await Shopify.findOne({shopName : shop})
            if(!document){
                return reject("install app")
            }
            // console.log('document', document)
        } catch (error) {
            return reject(error)
        }
        
        const options = {
            method : 'DELETE',
            headers : {
                'X-Shopify-Access-Token' : document['accessToken'],
                'content-type' : 'application/json',
            },
            url : url,
        }
        try {
            const deletedProductResponse = await axios(options)
            const deleted = await Products.findByIdAndDelete(productId)
            // console.log('Deleted Product', deletedProductResponse.data)
            return resolve(deletedProductResponse.data)
        } catch (error) {
            // console.log('Error while deleting product', error.message, error)
            return reject(error.message)
        }
    })
    .catch((error) => {
        console.log('Error deleting product', error.message, error)
    })
}