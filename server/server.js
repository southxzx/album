const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

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
const { response } = require('express');

//Middleware
const auth = require('./middleware/auth')

/*----------------------------- USER--------------------------- */



app.post('/api/users/register',async (req,res) => {

    const user = new User(req.body);
    
    await user.save((err) => {
        if (err) return res.json({success:false,err});
        res.status(200).json({
            success: true
        })
    })

});

app.get('/api/users/auth',auth, async (req,res) => {
    res.status(200).json({
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role : req.user.role,
        cart : req.user.cart,
        history : req.user.history
    })
});


app.post('/api/users/login',(req,res) => {   

    // Find the eamil
    User.findOne({'email':req.body.email},(err,user) => {
        if (!user) return res.json({loginSuccess:false,message:'Auth failed, Email not found'});

        // Check the password
        user.comparePassword(req.body.password,(err,isMatch) => {
            if (!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

            // If true => Generate a token
                token = jwt.sign({email: user.email, _id: user._id}, process.env.SECRET);
                console.log(token);
                user.token = token
                res.cookie('w_auth',token).status(200).json({
                    loginSuccess: true
                })

            // user.generateToken((err,user) => {
            //     if (err) return res.status(400).send(err);
            //     // res.cookie('w_auth',user.token).status(200).json({
            //     //     loginSuccess: true
            //     // })
            //     return res.json({token: jwt.sign({email: user.email, _id: user._id}, 'RESTFULAPIs')});
            // });

        })
    }) 

});



const port = process.env.port || 3002;

app.listen(port,() => {
    console.log(`Server is running at porttttt ${port}`);
    console.log(process.env.DATABASE);
})