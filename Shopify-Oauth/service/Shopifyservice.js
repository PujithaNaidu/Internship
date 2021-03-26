const nonce = require('nonce')();
const dotenv = require('dotenv').config();
const { query } = require('express');
const express = require('express');

const querystring = require('querystring');
const request = require('request-promise');
const router = express.Router();
const axios = require('axios');
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products,write_products';
const forwardingAddress = "https://06222731e737.ngrok.io";

const {shopResponse,response_header}=require('../integration/database')

exports.buildingUrl=(shop) =>{
     const state = nonce();
    const redirectUri = forwardingAddress + '/shopify/callback';
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;
    return {installUrl: installUrl, state: state}
}

exports.valditionUrl=({shop,hmac,code,state}) =>{
     return new Promise(async(resolve, reject) => {
        const query = {shop, hmac, code, state}
        const map = Object.assign({}, query);
        delete map['signature'];
        delete map['hmac'];
        const message = querystring.stringify(map);
        const providedHmac = Buffer.from(hmac, 'utf-8');
        const generatedHash = Buffer.from(
        crypto
            .createHmac('sha256', apiSecret)
            .update(message)
            .digest('hex'),
            'utf-8'
        );
        let hashEquals = false;
    
        try {
            hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
        } catch (e) {
            hashEquals = false;
        };
    
        if (!hashEquals) {
            return reject("HMAC validation failed")
        } else {
            const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
            const accessTokenPayload = {
                client_id: apiKey,
                client_secret: apiSecret,
                code,
            };
            try {
                const shopResponse = await shopResponse(shop, accessTokenRequestUrl, accessTokenPayload)
                return resolve(shopResponse)
            } catch (error) {
                return reject(error.message)
            }
        }
    });
}

exports.getProducts = (shop) => {
    return new Promise(async(resolve, reject) => {
        const url = 'https://' + shop + '/admin/api/2021-01/products.json'
        try {
            const products = await getProducts(shop, url)
            return resolve(products)
        } catch (error) {
            return reject(error)
        }
    })
}

exports.addProduct = (shop, newProduct) => {
    return new Promise(async(resolve, reject) => {
        const url = 'https://' + shop + '/admin/api/2021-01/products.json'
        try {
            const addedProduct = await addProduct(shop, url, newProduct)
            return resolve(addedProduct)
        } catch (error) {
            return reject(error)
        }
    })
}
