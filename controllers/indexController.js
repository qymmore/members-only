const Message = require('../models/message');

exports.index = async(req,res,next) => {
    try{
        const messages = await Message.find().sort([["time", "descending"]]).populate('user');
        return res.render('index', {title: 'Secret Message Board', user: req.user, messages: messages});
    } catch(err) {
        return next(err)
    }
};