const express = require('express');
const mongoose =require('mongoose');
const cors =require('cors');
const dotenv=require('dotenv')
const { urlencoded } = require('body-parser');


const user =require('./routers/user')

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use('/api/auth',user)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })


app.listen(port, () => console.log(` app listening on port ${port}!`))