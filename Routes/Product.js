import express from 'express';
import { client } from '../index.js'
const router = express.Router();

// add products
router.post('/', async (req, res) => {
    const newProduct = req.body;
    const result = await client
        .db("Product")
        .collection("Products")
        .insertMany(newProduct);
    res.send(result)
});

// get products
router.get('/', async (req, res) => {
    const result = await client
        .db("Product")
        .collection("Products")
        .find({})
        .toArray();
    res.send(result);
})

export const productRouter = router;