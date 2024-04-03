const express = require('express');
const dateController = require('../controllers/date_controller');

const api = express.Router();
api.post('/saveDate', dateController.saveDate);
api.get('/getDatesByUser/:id', dateController.getDatesByUser);
api.put('/updateDate/:id', dateController.updateDate);
api.delete('/deleteDate/:id', dateController.deleteDate);

module.exports = api;