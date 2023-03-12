import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import cartRoute from './routes/cart.js'
import orderRoute from './routes/order.js'
import productRoute from './routes/product.js'
import userRoute from './routes/user.js'
import checkoutRoute from './routes/stripe.js'


dotenv.config();
const app = express();
    
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('Base de données est connecté'))
        .catch((error) => console.log(error))

    mongoose.set('strictQuery', false);
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)
app.use('/api/product', productRoute)
app.use('/api/user', userRoute)
app.use('/api/checkout', checkoutRoute)

app.listen(process.env.PORT, () =>{
    console.log('connection backend')})