import express from 'express';
import dotenv  from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRouting from './routing/productRouting.js';
import userRouting from './routing/userRouting.js';
import orderRoutes from './routing/orderRoutes.js';
import {errorHandler, notFound} from './middleware/errorMiddleware.js'

dotenv.config();


const app = express();

//init middleware
app.use(express.json());


// connecting to mongo db..
connectDB();

app.get('/', (req, res) => {
    res.send(' Api running in the backend .....');
});

app.use('/api/products', productRouting);
app.use('/api/users', userRouting);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT,  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold.underline));