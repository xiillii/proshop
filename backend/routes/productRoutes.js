import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

// @desc    Fetch  all products
// @route   GET /api/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { offset = 1, limit = 10 } = req.query;

    const totalRecords = await Product.countDocuments();

    const products = await Product.find({})
      .limit(limit)
      .skip((offset - 1) * limit)
      .exec();

    res.setHeader('X-Total-Count', totalRecords);

    res.status(200).json(products);
  })
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product  not found');
    }
  })
);

export default router;
