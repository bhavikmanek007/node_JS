var express = require('express');
var controller = require('./sub_category.controller');
var middleware = require('../../../middleware');

var router = express.Router();
module.exports = router;

router.post('/addUpdateSubCategory', middleware.checkAccessToken, middleware.userRightsByAPI, middleware.logger, controller.addUpdateSubCategory);
router.get('/get-sub_category/:sub_categoryID', middleware.checkAccessToken, middleware.userRightsByAPI, middleware.logger, controller.getSubCategory);
router.delete('/remove-sub_category/:sub_categoryID', middleware.checkAccessToken, middleware.userRightsByAPI, middleware.logger, controller.deleteSubCategory);
