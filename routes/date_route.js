const express = require('express');
const dateController = require('../controllers/date_controller');

const api = express.Router();
api.post('/saveDate', dateController.saveDate);
api.post('/getDatesByUser', dateController.getDatesByUser);
api.put('/updateDate', dateController.updateDate);
api.delete('/deleteDate', dateController.deleteDate);

module.exports = api;