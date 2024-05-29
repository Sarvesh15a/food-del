import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//app config

const app = express();
const PORT=4000;

//middleware
app.use(express.json())
app.use(cors())

//db connection 

connectDb();

//add api endpoint

app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)




app.get('/api',(req,res)=>{
    res.send("api is working")
})

app.listen(PORT,()=>{
    console.log(`server is working on PORT ${PORT}`)
})