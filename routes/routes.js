const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/authController')
const index_controller = require('../controllers/indexController')
const user_controller = require('../controllers/userController')

// HOMEPAGE ROUTE
router.get('/', index_controller.index);

// LOG IN ROUTES
router.get('/log-in', auth_controller.log_in_get);
router.post('/log-in', auth_controller.log_in_post);

// LOG OUT ROUTES

router.get('/log-out', auth_controller.log_out_get);

// SIGN UP ROUTES
router.get('/sign-up', auth_controller.sign_up_get);
router.post('/sign-up', auth_controller.sign_up_post);

// MEMBERSHIP ROUTES
router.get('/member', user_controller.member_get);
router.post('/member', user_controller.member_post);

// ADMIN ROUTES
router.get('/admin', user_controller.admin_get);
router.post('/admin', user_controller.admin_post);

// MESSAGE ROUTES

module.exports = router;