const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();
        const email = 'admin@example.com';
        const passwordPlain = '123456';

        // Hash the password manually since User model seems to lack pre-save hook for now
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordPlain, salt);

        const user = await User.findOne({ email });

        if (user) {
            console.log('Admin user exists, resetting password...');
            user.password = hashedPassword;
            user.isAdmin = true;
            user.role = 'admin'; // Ensure role is admin
            await user.save();
            console.log('✅ Admin user updated. Password is: 123456');
        } else {
            console.log('Admin user does not exist, creating...');
            await User.create({
                name: 'Admin User',
                email: email,
                password: hashedPassword,
                isAdmin: true,
                role: 'admin'
            });
            console.log('✅ Admin user created. Password is: 123456');
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin();
