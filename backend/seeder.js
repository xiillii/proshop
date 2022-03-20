import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import productsToMongo from './data/productsToMongo.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDb from './config/db.js';
import {
  randAnimalType,
  randBrand,
  randEmail,
  randFloat,
  randFullName,
  randNumber,
  randProduct,
  randProductCategory,
  randProductDescription,
} from '@ngneat/falso';

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProducts = productsToMongo.map((p) => {
      return { ...p, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const importMillionData = async () => {
  try {
    const nToGenerate = 1000000;

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    for (let i = 0; i < nToGenerate; i++) {
      var rProduct = randProduct();

      let product = new Product({
        user: adminUser,
        name: rProduct.title,
        image: `/images/product${String(
          Math.floor(Math.random() * 20) + 1
        ).padStart(2, '0')}.jpg`,
        description: rProduct.description,
        brand: randBrand(),
        category: rProduct.category,
        price: rProduct.price,
        countInStock: randNumber({ min: 0, max: 1000 }),
        rating: rProduct.rating.rate,
        numReviews: rProduct.rating.count,
      });
      await Product.create(product);
    }

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else if (process.argv[2] === '-im') {
  importMillionData();
} else {
  importData();
}
