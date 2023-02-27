const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.sign_up_get = (req,res,next) => {
    res.render('sign-up-form', {title: "Sign Up"})
};

exports.sign_up_post = [ 
    body("username")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Username must be at least 6 characters"),
    body("password")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Password must be at least 6 characters"),
    body("confirmPassword")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Password must be at least 6 characters")
    .custom(async (value, {req}) => {
        if(value !== req.body.password) throw new Error("Passwords must be the same")
        return true
    }),

    async(req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log('error')
            return res.render('sign-up-form', {title: "Sign Up", passwordConfirmationError: "Passwords must be the same"})
        }

        try {
            const alreadyUser = await User.find({"username": req.body.username});
            //if user already exists re-render sign up form
            if(alreadyUser.length > 0) return res.render("sign-up-form", {title: "Sign Up", error: "User already exists"})
            //if new user, sign up to database
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err) return next(err);
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    isMember: false,
                    isAdmin: false,
                }).save(err => err ? next(err) : res.redirect('/'));
            });
        } catch(err){
            return next(err);
        }
    }
];

exports.log_in_get = (req,res) => {
    if(res.locals.currentUser) return res.redirect('/');
    res.render('log-in-form', {title: 'Login'});
};

exports.log_in_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
});

exports.log_out_get = (req,res,next) => {
    req.logout((err) => {
        if(err) return next(err)
    });
    res.redirect('/');
}