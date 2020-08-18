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

});

// app.get('/api/users/test',(req,res) => {
//     return res.status(200).json({
//         dm: true
//     })
// })

app.post('/api/users/login',(req,res) => {   

    // Find the eamil
    User.findOne({'email':req.body.email},(err,user) => {
        if (!user) return res.json({loginSuccess:false,message:'Auth failed, Email not found'});

        // Check the password
        user.comparePassword(req.body.password,(err,isMatch) => {
            if (!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

            // If true => Generate a token
            user.generateToken((err,user) => {
                if (err) return res.status(400).send(err);
                res.cookie('w_auth',user.token).status(200).json({
                    loginSuccess: true
                })
            })

        })
    }) 

});



const port = process.env.port || 3002;

app.listen(port,() => {
    console.log(`Server is running at port ${port}`);
    console.log(process.env.DATABASE);
})