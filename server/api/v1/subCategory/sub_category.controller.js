var debug = require('debug')('server:api:v1:sub_category:controller');
var sub_categoryService = require('./sub_category.service');
var constant = require('../constant');
/**
 * Created By: CBT
 * Updated By: CBT
 * [addUpdateCategory description]
 * @param {[type]} request  [description]
 * @param {[type]} response [description]
 */

var addUpdateSubCategory = (request, response) => {
  debug("sub_category.controller -> add sub_category");
  if (request.session.userInfo !== undefined) {
    if (Object.keys(request.body).length != 0 && typeof request.body === "object") {
      sub_categoryService.addUpdateSubCategoryService(request,  (result) => {
        return response.send(result);
      })
    } else {
      return response.send({
        status: false,
        error: constant.requestMessages.ERR_INVALID_CATEGORY_ADD_REQUEST
      });
    }
  } else {
    return response.send({
      status: false,
      error: constant.userMessages.ERR_INVALID_USERINFO
    });
  }
};

/**
 * [getCategory description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var getSubCategory =  (request, response) => {
  debug("sub_category.controller -> get sub_category");
  if (request.session.userInfo !== undefined) {
    sub_categoryService.getSubCategoryService(request, (result) => {
      return response.send(result);
    })
  } else {
    return response.send({
      status: false,
      error: constant.userMessages.ERR_INVALID_USERINFO
    });
  }
};




/**
 * Created By: CBT
 * Updated By: CBT
 * [deleteCategory description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var deleteSubCategory = (request, response) => {
  debug("sub_category.controller -> delete sub_category");
  if (request.session.userInfo !== undefined && request.params !== undefined) {
    sub_categoryService.deleteSubCategoryService(request, (result) => {
      return response.send(result);
    })
  } else {
    return response.send({
      status: false,
      error: constant.userMessages.ERR_INVALID_USERINFO
    });
  }
};



module.exports = {
  addUpdateSubCategory: addUpdateSubCategory,
  getSubCategory: getSubCategory,
  deleteSubCategory: deleteSubCategory,
};
