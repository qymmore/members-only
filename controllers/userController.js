const User = require('../models/user')
const {body, validationResult} = require('express-validator')

exports.member_get = (req,res,next) => {
    if(!res.locals.currentUser) {
        return res.redirect('/log-in')
    }
    return res.render('member-form', {title: 'Join membership', user: res.locals.currentUser});
}

exports.member_post = [
    body('passcode')
    .trim()
    .isLength({min:1})
    .escape()
    .withMessage('Specify passcode'),

    async (req,res,next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.render('member-form', {title: 'Join membership', user: res.locals.currentUser, errors: errors.array()});
        } else if(req.body.passcode != process.env.MEMBER_PASSCODE) {
            return res.render('member-form', {title: 'Join membership', user: res.locals.currentUser, passcodeError: 'Oops, incorrect passcode!'});
        }

        const user = new User(res.locals.currentUser);
        user.isMember = true;

        await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
            if(err) return next(err)
            return res.redirect('/member')
        });
    },
];

exports.admin_get = (req,res,next) => {
    //users not logged in cannot access this route
    if(!res.locals.currentUser) {
        return res.redirect('/log-in')
    }
    return res.render('admin-form', {title: 'So, you want to be an admin?', user: res.locals.currentUser});
}

exports.admin_post = [
    body("admincode").trim().isLength({ min: 1 }).escape().withMessage("Passcode must be specified."),
  
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If there is an error submitting the member validation form, re-render the form with an error
      return res.render("admin-form", { title: "So, you want to be an admin?", user: res.locals.currentUser, errors: errors.array() });
    } else if (req.body.admincode != process.env.ADMIN_PASSCODE) {
      return res.render("admin-form", { title: "So, you want to be an admin?", user: res.locals.currentUser, adminCodeError: "Oops, wrong passcode!" });
    }

    const user = new User(res.locals.currentUser);
    user.isAdmin = true;

    await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  },
]