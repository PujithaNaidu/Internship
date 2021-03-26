const crypto = require('crypto');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
var express = require('express');
var router = express.Router();
var url = require('url');
var request = require('request-promise');

const app = express();

const cookie = require('cookie');

const querystring = require('querystring');





    // let appId = process.env.appId;
    // let appSecret = process.env.appSecret;
    // let shop = req.query.shop;
    // let code = req.query.code;

function validateShop(shop){
    let securityPass = false;
    const regex=/^[a-z\d_.-]+[.]myshopify[.]com$/;
    if (shop.match(regex)) {
        console.log('regex is ok');
        securityPass = true;
    } else {
        //exit
        securityPass = false;
    }
}
async function generateToken(data) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const body = {
        client_id:data.apiKey ,
        client_secret:data.apiSecret ,
        code:data.code

    }
    try {
        const response = await axios({
            method: 'post',
            url: `https://${shop}/admin/oauth/access_token`,
            headers: headers,
            data: body
        });
        console.log(response.data);
        return response.data

    } catch (error) {
        return { message: "Requesting access token failed.", status: 400 }

    }
}

function verifyHmac(Values) {

    const map = Object.assign({}, Values);
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
      return res.status(400).send('HMAC validation failed');
    }
}


async function getToken(returnValues) {
    // Security check 1
    const shopTest = validateShop(returnValues.shop);
    console.log("testOne " + shopTest)

    // security check 2
    const ok = verifyHmac(returnValues);
    console.log("testTwo " + ok)

    if (ok && securityPass) {
        const token = await generateToken(returnValues)
        return { status: 200, accessToken: token.access_token };

    } else {
        return ({ message: "URL verificaiton failed.", status: 400 })
    }
}

module.exports={
    getToken
}





