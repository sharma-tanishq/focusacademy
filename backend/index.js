const connectToMongoose=require('./connectDB');
const express = require('express');
const cors= require('cors')

// const cors= require('cors')

connectToMongoose();

const app = express();
app.use(express.json());
app.use(cors());
//Routes
app.get('/',(req,res)=>{
    res.send('Working');
})
app.use('/api/',require('./routes/auth'))

app.listen(5000,()=>{console.log(`Example app listening at http://localhost:${5000}`)});

