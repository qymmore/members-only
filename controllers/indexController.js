const Message = require('../models/message');

exports.index = async(req,res,next) => {
    try{
        return res.render('index', {title: 'Secret Message Board', user: req.user})
    } catch(err) {
        return next(err)
    }
};