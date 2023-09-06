import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

const DB_URI = 'mongodb://127.0.0.1:27017/mydb'; // Replace with your connection string

mongoose.connect(DB_URI, {});

mongoose.connection.on('connected', () => {
    console.log('Successfully connected to the database.');
});

mongoose.connection.on('error', (error) => {
    console.error('Error connecting to the database:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from the database.');
});



app.use(express.json());
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
