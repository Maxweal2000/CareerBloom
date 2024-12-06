import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const connectionString = 'mongodb://localhost:27017/careerbloom';  // MongoDB connection string
console.log("Connection String: " + connectionString);

const db = async () => {

    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
export default db;
