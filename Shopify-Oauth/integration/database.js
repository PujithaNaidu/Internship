const dotenv = require('dotenv').config();
var finalhandler = require('finalhandler')
var http         = require('http')
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const router = express.Router();
const axios = require('axios');
const Store=require('../models/store');



exports.shopResponse= async(shop,accessTokenRequestUrl,accessTokenPayload ) =>{
    return new Promise(async(resolve, reject) => {
        const accessTokenResponse = await request.post(accessTokenRequestUrl, { json: accessTokenPayload })
        const accessToken = accessTokenResponse.access_token;
        try {
            let obj  = schema({shopName: shop, accessToken: accessToken})
            const respo = await obj.save()
            console.log("accesstoken", respo)
        } catch (error) {
            console.log("accesstoken error",error)
        }
        const shopRequestUrl = 'https://' + shop + '/admin/api/2021-01/shop.json';
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': accessToken,
        };
        try {
            const shopResponse = await response_header('GET', shopRequestUrl, shopRequestHeaders)
            return resolve(shopResponse)
        } catch (error) {
            return reject(error.message)
        }
    })

  
}

exports.getProducts = async(shop, url) => {
    return new Promise (async(resolve, reject) => {
        try {
            let headers = await getHeaders(shop)
            const products = await response_header('GET', url, headers)
            return resolve(products)
        } catch (error) {
            console.log("Error while getting product", error.message, error)
            return reject(error.message)
        }
    })
}


exports.addProduct = async(shop, url, newProduct) => {
    return new Promise (async(resolve, reject) => {
        try {
            let headers = await getHeaders(shop)
            const data = {
                product: newProduct
            }
            const addedProduct = await response_header('POST', url, headers, data)
            return resolve(addedProduct)
        } catch (error) {
            console.log("Error while adding product", error.message, error)
            return reject(error.message)
        }
    })
}

async function getHeaders(shop) {
    return new Promise (async(resolve, reject) => {
        try {
            const shop = await shopSchema.findOne({shopName:shop})
            const headers = {
                'X-Shopify-Access-Token': shop.accessToken,
                'content-type' : 'application/json',
            }
            return resolve(headers)
        } catch (error) {
            console.log("Error while getting access token", error, error.message)
            return reject(error.message)
        }
    })
}


async function response_header(method,url,header,data=null){
    return new Promise(async(resolve, reject) => {
        const options = {
            method: method,
            headers: headers,
            url: url,
        }
        if (data) {
            options['data'] = data
        }
        try {
            const response = await axios(options)
            return resolve(response.data)
        } catch (error) {
            console.log(error)
            return reject(error.message)
        }
    })

    
}

// module.exports={response_header,shopResponse}

  