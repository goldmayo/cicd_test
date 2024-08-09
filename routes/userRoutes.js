const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register/step1', userController.registerStep1);
router.post('/register/step2', userController.registerStep2);
router.get('/find-id', userController.findId);
router.get('/find-password', userController.findPassword);
router.post('/login', userController.login);

module.exports = router;
