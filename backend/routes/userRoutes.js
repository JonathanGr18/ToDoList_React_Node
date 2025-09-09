const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers.js');

// Rute Users
router.post('/register', userController.resgisterUser);
router.post('/login', userController.loginUser);

module.exports = router;