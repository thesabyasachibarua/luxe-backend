const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Order = require('./models/Order');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const checkData = async () => {
    try {
        await connectDB();

        const orderCount = await Order.countDocuments();
        const paidOrders = await Order.countDocuments({ isPaid: true });
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();

        console.log('--- DB STATS ---');
        console.log(`Orders: ${orderCount}`);
        console.log(`Paid Orders: ${paidOrders}`);
        console.log(`Users: ${userCount}`);
        console.log(`Products: ${productCount}`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
