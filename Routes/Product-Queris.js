import express from 'express';
import { client } from '../index.js'
const router = express.router();

// Find all the information about each products
db.products.find({})

// Find the product price which are between 400 to 800
db.products.find({ "product_price": { $gte: 400, $lte: 800 } })

// Find the product price which are not between 400 to 600
db.products.find({ "product_price": { $not: { $gte: 400, $lte: 600 } } })


// List the four product which are grater than 500 in price
db.products.find({ "product_price": { $gt: 500 } }).limit(4)


// Find the product name and product material of each products
db.products.find({}, { "product_name": 1, "product_material": 1 })


// Find the product with a row id of 10
db.products.find({ "id": "10" })


// Find only the product name and product material
db.products.find({ "product_name": 1, "product_material": 1 })


// Find all products which contain the value of soft in product material
db.products.find({ "product_material": { $regex: /soft/i } })


// Find products which contain product color indigo  and product price 492.00
db.products.find({
    $and: [
        { "product_color": "indigo" },
        { "product_price": 492.00 }
    ]
})


// Delete the products which product price value are same
db.products.deleteMany({ 
    "_id": { "$in": db.products.aggregate([
      { "$group": { "_id": "$product_price", "count": { "$sum": 1 } } },
      { "$match": { "count": { "$gt": 1 } } },
      { "$project": { "_id": 0, "product_price": "$_id" } }
    ]).map(result => result.product_price) }
  })
  

export const productQueries = router;