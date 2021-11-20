const express = require('express');
const graduateRouter = express();
const graduateSchema = require('../models/graduate.models');
const { graduateController } = require('../controllers/graduate.controllers');



graduateRouter.get('/', graduateController.graduateData);
graduateRouter.post('/graduateNew', graduateController.graduateCreate);
graduateRouter.delete('/:id', graduateController.graduateDelete);


module.exports = graduateRouter;