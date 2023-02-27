const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/authController')
const index_controller = require('../controllers/indexController')

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

module.exports = router;