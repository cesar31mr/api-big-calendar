const express = require('express');
const userController = require('../controllers/user_controller');

const api = express.Router();
api.post('/signUp', userController.signUp);
api.post('/login', userController.login);
api.put('/updateUser/:id', userController.updateUser);

module.exports = api;
