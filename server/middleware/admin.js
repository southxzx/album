module.exports = (req,res,next) => {
    if (req.user.role === 0){
        return res.send('You are not allowed, Get the fuck out now!!!');
    }
    next();
}