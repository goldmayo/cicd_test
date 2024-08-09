const express = require('express');
const myPageController = require('../controllers/myPageController');
const router = express.Router();

router.post('/update-user-info', myPageController.updateUserInfo);
router.post('/update-payment-info', myPageController.updatePaymentInfo);
router.get('/user-info/:id', myPageController.getUserInfo);

module.exports = router;