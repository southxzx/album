const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();
require('dotenv').config();

//Nhập mô-đun mongoose
const mongoose = require('mongoose');

//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise =  global.Promise;
mongoose.connect(process.env.DATABASE);

//
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


//MODELS
const { User } = require('./models/user');

/*----------------------------- USER--------------------------- */



app.post('/api/users/register',(req,res) => {

    const user = new User(req.body);
    
    user.save((err,doc) => {
        if (err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })

})

const port = process.env.port || 3002;

app.listen(port,() => {
    console.log(`Server is running at port ${port}`);
    console.log(process.env.DATABASE);
})