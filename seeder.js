const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const products = [
    {
        name: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        description: 'Experience immersive sound with our premium wireless headphones. Features active noise cancellation, 40-hour battery life, and premium comfort. Perfect for Dhaka traffic commutes.',
        brand: 'AudioPro',
        category: 'Electronics',
        price: 35000,
        countInStock: 15,
        rating: 4.8,
        numReviews: 24,
    },
    {
        name: 'Smart Watch Series 7',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        description: 'Stay connected with our latest smartwatch. Track your fitness, receive notifications, and enjoy all-day battery life.',
        brand: 'TechWear',
        category: 'Wearables',
        price: 48000,
        countInStock: 20,
        rating: 4.9,
        numReviews: 36,
    },
    {
        name: 'Ergonomic Office Chair',
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
        description: 'Premium ergonomic chair designed for all-day comfort. Features adjustable lumbar support, breathable mesh, and 360-degree swivel.',
        brand: 'ErgoFlex',
        category: 'Furniture',
        price: 65000,
        countInStock: 8,
        rating: 4.7,
        numReviews: 18,
    },
    {
        name: 'Professional Camera Kit',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
        description: '4K professional camera with included lenses. Perfect for photography enthusiasts in Bangladesh.',
        brand: 'SnapPro',
        category: 'Cameras',
        price: 155000,
        countInStock: 5,
        rating: 5.0,
        numReviews: 42,
    },
    {
        name: 'Leather Travel Backpack',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        description: 'Premium leather backpack with laptop compartment. Perfect for travel from Coxs Bazar to Sylhet.',
        brand: 'TravelCo',
        category: 'Bags',
        price: 21500,
        countInStock: 12,
        rating: 4.6,
        numReviews: 15,
    },
    {
        name: 'Minimalist Desk Lamp',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&q=80',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature. Perfect for any workspace.',
        brand: 'LightDesign',
        category: 'Home',
        price: 10500,
        countInStock: 25,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Stainless Steel Water Bottle',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
        description: 'Premium insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.',
        brand: 'HydroLife',
        category: 'Wellness',
        price: 4200,
        countInStock: 50,
        rating: 4.8,
        numReviews: 28,
    },
    {
        name: 'Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
        description: 'RGB mechanical keyboard with premium switches. Perfect for gaming and productivity.',
        brand: 'KeyMaster',
        category: 'Electronics',
        price: 18000,
        countInStock: 18,
        rating: 4.7,
        numReviews: 32,
    },
    {
        name: 'Ceramic Pour-Over Set',
        image: 'https://images.unsplash.com/photo-1544068305-64d4b3c75m52?w=800&q=80',
        description: 'Artisan ceramic pour-over coffee set with precision kettle. For the coffee connoisseur.',
        brand: 'BrewCraft',
        category: 'Home',
        price: 6000,
        countInStock: 30,
        rating: 4.9,
        numReviews: 45,
    },
    {
        name: 'Noise-Cancelling Earbuds',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
        description: 'True wireless earbuds with industry-leading noise cancellation and crystal clear sound.',
        brand: 'AudioPro',
        category: 'Electronics',
        price: 24000,
        countInStock: 22,
        rating: 4.6,
        numReviews: 58,
    },
    {
        name: 'Weekender Duffle Bag',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        description: 'Stylish and durable duffle bag for short trips. Water-resistant canvas with leather trim.',
        brand: 'TravelCo',
        category: 'Bags',
        price: 15500,
        countInStock: 15,
        rating: 4.8,
        numReviews: 29,
    },
    {
        name: 'Smart Home Hub',
        image: 'https://images.unsplash.com/photo-1558002038-1091a166be29?w=800&q=80',
        description: 'Control your entire home with voice commands. Compatible with thousands of smart devices.',
        brand: 'TechLife',
        category: 'Electronics',
        price: 9500,
        countInStock: 40,
        rating: 4.5,
        numReviews: 62,
    },
];

const importData = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany();
        console.log('Products cleared');

        // Get or create admin user
        let adminUser = await User.findOne({ email: 'admin@example.com' });
        if (!adminUser) {
            adminUser = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: '123456',
                isAdmin: true,
            });
        }

        // Add user field to products
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser._id };
        });

        await Product.insertMany(sampleProducts);

        console.log('✅ Data Imported Successfully!');
        console.log(`Created ${sampleProducts.length} products`);
        process.exit();
    } catch (error) {
        console.error('❌ Error importing data:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('✅ Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error('❌ Error destroying data:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
