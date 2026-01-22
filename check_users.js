const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const checkUsers = async () => {
    try {
        const users = await User.find({});
        console.log('--- USERS IN DB ---');
        console.log(`Total Users: ${users.length}`);
        users.forEach(u => {
            console.log(`- ID: ${u._id}, Name: ${u.name}, Email: ${u.email}, Role: ${u.role}, Admin: ${u.isAdmin}`);
        });
        console.log('-------------------');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

checkUsers();
