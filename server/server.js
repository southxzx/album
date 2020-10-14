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
app.use(bodyParser.urlencoded({extended:true})); // => Query from URL
app.use(bodyParser.json());
app.use(cookieParser());


//MODELS
const { User } = require('./models/user');
const { Genre } = require('./models/genre');
const { Material } = require('./models/material');
const { Product } = require('./models/product');

const { response } = require('express');

//Middleware
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

/*----------------------------- MATERIAL --------------------------- */

// Thêm Material
app.post('/api/product/material',auth,admin,(req,res) => {
    const material = new Material(req.body);

    material.save((err,doc) => {
        if (err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            material: doc
        })
    })
})

// Xem Materials
app.get('/api/product/materials',(req,res) => {
    Material.find({},(err,materials) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(materials);
    })
})

/*----------------------------- GENRE --------------------------- */

// Thêm Genre
app.post('/api/product/genre',auth,admin,(req,res) => {
    const genre = new Genre(req.body);

    genre.save((err,doc) => {
        if (err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            genre: doc
        })
    })
})

// Xem Genres
app.get('/api/product/genres',(req,res) => {
    Genre.find({},(err,genres) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(genres);
    })
})


/*----------------------------- PRODUCT --------------------------- */

// By Arrival : article?sortBy=createdAt&order=desc&limit=4

// By Sell : article?sortBy=sold&order=desc&limit=4
app.get('/api/product/articles',(req,res) => {

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy: '_id';
    let limit = req.query.limit ? parseInt(req.query.limit): 100;

    Product.
    find().
    populate('genre').
    populate('material').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles) => {
        if (err) return res.status(400).send(err);
        res.send(articles);
    })
})

// api/product/article?id=d8yegcygg88hh&type=...
app.get('/api/product/articles_by_id',(req,res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === 'array'){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        })
    }

    Product.
    find({'_id':{$in:items}}).
    populate('genre').
    populate('material'). // Populate -> Chuyển id thành object
    exec((err,docs) => {
        return res.status(200).send(docs);
    })
})

// Add Product
app.post('/api/product/article',auth,admin,(req,res) => {
    const product = new Product(req.body);

    product.save((err,doc) => {
        if (err) return res.json({success:false,err})
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

/*----------------------------- USER--------------------------- */


// Đăng ký
app.post('/api/users/register',async (req,res) => {

    const user = new User(req.body);
    
    await user.save((err) => {
        if (err) return res.json({success:false,err});
        res.status(200).json({
            success: true
        })
    })

});

// Logout
app.get('/api/users/logout',auth,(req,res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''},
        (err,doc) => {
            if (err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

// Route authentication
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

// Đăng nhập
app.post('/api/users/login',(req,res) => {   

    // Find the eamil
    User.findOne({'email':req.body.email},(err,user) => {
        if (!user) return res.json({loginSuccess:false,message:'Auth failed, Email not found'});

        // Check the password
        user.comparePassword(req.body.password,(err,isMatch) => {
            if (!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

            // If true => Generate a token
                token = jwt.sign({email: user.email, _id: user._id}, process.env.SECRET);
                user.token = token;
                User.findByIdAndUpdate(
                    {_id: user._id},
                    {token: token},
                    (err,doc) => {
                        if (err) return res.json({success:false,err});
                    }
                )
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