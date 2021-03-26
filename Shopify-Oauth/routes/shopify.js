

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
const {buildingUrl,valditionUrl}=require('../service/Shopifyservice')
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products,write_products';
const forwardingAddress = "https://06222731e737.ngrok.io"; 
// Replace this with your HTTPS Forwarding address

app.get("/", (req, res) => {
  res.send('This is home page');
})

app.get('/shopify', async(req, res)=>{
  const shop=req.query.shop;
  console.log(shop);
  if(shop){
    const {installUrl,state} = buildingUrl(shop)
    // console.log(installUrl);
    res.cookie('state', state);
    res.redirect(installUrl);
  } else{
    res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
});

app.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified');
  }

  if (shop && hmac && code) {
     
     try{

       const shop_response=valditionUrl(req.query);
       res.status(200).send(shop_response);
     }
     catch(error){
          res.status(400).send(error);
     }

  } 
  else {
    res.status(400).send('Required parameters missing');
  }
});

app.get('/products', async(req, res) => {
    const {shop} = req.query
    console.log("got into products")
    if (shop){
        try {
            const products = await getProducts(shop)
            res.status(200)
            res.send(products)
        } catch (error) {
            res.status(400)
            res.send(error)
        }
    } else {
		console.log(req.query)
		res.status(400)
        res.send("shop missed")
	}
});

app.post('/products', async(req, res) => {
    const {product, shop} = req.body
    console.log("inproducts")
    if (shop && product){
        try {
            const addedProduct = await addProduct(shop, product)
            res.status(200)
            res.send(addedProduct)
        } catch (error) {
            res.status(400)
            res.send(error)
        }
    } else {
        res.status(400)
        res.send("missing shop or product")
    }
  });

 
app.listen(5000, () => {
  console.log('Example app listening on port 4000!');
});

module.exports = router;

