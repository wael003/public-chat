const express = require('express');
const Route = express.Router();
const chatController = require('../controller/chatController');
const authMiddleware = require('../middleware/auth');


Route.get('/get' ,chatController.getChats )
Route.post('/send',authMiddleware ,chatController.send )

module.exports = Route;