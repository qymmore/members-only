const Message = require('../models/message')
const {body, validationResult} = require('express-validator')

exports.message_get = (req,res,next) => {
    if(!req.user) {
        return res.redirect('/log-in')
    }
    res.render('message-form', {title: "Create message", user: req.user})
};

exports.message_post = [
    body('message')
    .trim()
    .isLength({min: 1})
    .withMessage("Text cannot be empty"),

    async(req,res,next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('message-form', {title: 'Create message', errors: errors.array()});
        }

        const message = new Message({
            user: req.user._id,
            text: req.body.message,
            time: Date.now()
        })

        await message.save((err) => {
            if(err) return next(err);
            res.redirect('/');
        });
    }
];

exports.delete_message_post = (req,res,next) => {
    Message.findByIdAndRemove(req.body.messageId, function deleteMessage(err) {
        if(err) return next(err);
        res.redirect('/')
    })
}