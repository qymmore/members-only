const Message = require('../models/message')
const {body, validationResult} = require('express-validator')

exports.message_get = (req,res,next) => {
    if(!res.locals.currentUser) {
        return res.redirect('/log-in')
    }
    res.render('message_form', {title: "Create message", user: res.local.currentUser})
};

