require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const result = await mongoose.connection.db.collection('users').deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} users`);
        console.log('\n👉 Now register a new account and try logging in!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
