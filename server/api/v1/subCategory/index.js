var express = require('express');
var service = require('./sub_category.service');
var middleware = require('../../../middleware');

var router = express.Router();
module.exports = router;

router.post('/addUpdateSubCategory', middleware.checkAccessToken, middleware.userRightsByAPI, middleware.logger, service.addUpdateSubCategoryService);
router.get('/get-sub_category/:sub_categoryID', middleware.checkAccessToken, middleware.userRightsByAPI, middleware.logger, service.getSubCategoryService);
router.delete('/remove-sub_category/:sub_categoryID', middleware.checkAccessToken, middleware.userRightsByAPI, middleware.logger, service.deleteSubCategoryService);
