var debug = require('debug')('server:api:v1:inventory:DAL');
var d3 = require("d3");
var DateLibrary = require('date-management');
var common = require('../common');
var constant = require('../constant');
var query = require('./sub_category.query');
var dbDateFormat = constant.appConfig.DB_DATE_FORMAT;

/**
 * Created By: CBT
 * Updated By: CBT
 * [createCategory description]
 * @param  {[type]}   fieldValue [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
var createSubCategory = (fieldValue, cb) => {
  debug("sub_category.DAL -> createSubCategory");
  var createSubCategory = common.cloneObject(query.createSubCategory);
  createSubCategory.insert = fieldValue;
  common.executeQuery(createSubCategory, cb);
};

/**
 * Created By: CBT
 * Updated By: CBT
 * [updateSubCategory description]
 * @param  {[type]}   fieldValue [description]
 * @param  {[type]}   categoryID [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
var updateSubCategory = (fieldValue, sub_categoryID, cb) => {
  debug("sub_category.DAL -> updateSubCategory");
  var updateSubCategory = common.cloneObject(query.updateSubCategory);
  updateSubCategory.update = fieldValue;
  updateSubCategory.filter.value = sub_categoryID;
  common.executeQuery(updateSubCategory, cb);
};

/**
 * Created By: CBT
 * Updated By: CBT
 * [getSubCategory description]
 * @param  {[type]}   dbServerDateTime [description]
 * @param  {[type]}   limit            [description]
 * @param  {Function} cb               [description]
 * @return {[type]}                    [description]
 */
var getSubCategory = (sub_categoryID, isActive, dbServerDateTime, limit, cb) => {
  debug("sub_category.DAL -> getSubCategory");
  var getSubCategoryQuery = common.cloneObject(query.getSubCategoryQuery);
  var sub_categoryFilter = {
    and: []
  }
  if (sub_categoryID > -1) {
    sub_categoryFilter.and.push({
      field: 'SCM.pk_subcategoryID',
      encloseField: false,
      operator: 'EQ',
      value: sub_categoryID
    });
  }
  // if (isActive > -1) {
  //   sub_categoryFilter.and.push({
  //     field: 'isActive',
  //     operator: 'EQ',
  //     value: isActive
  //   });
  // }
  if (sub_categoryID < 0 && isActive < 0) {
    delete getSubCategoryQuery.filter;
  } else {
    getSubCategoryQuery.filter = sub_categoryFilter;
  }

  // getCategoryQuery.limit = limit;
  common.executeQuery(getSubCategoryQuery, cb);
};




/**
 * Created By: CBT
 * Updated By: CBT
 * [checkCategoryIDValid description]
 * @param  {[type]}   categoryID [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
var checkSubCategoryIDValid = (sub_categoryID, cb) => {
  debug("sub_category.DAL -> checkDeleteSubCategoryIDValid");
  var checkCateGoryValid = common.cloneObject(query.checkCateGoryValidQuery);
  checkCateGoryValid.filter = {
    and: [{
      field: 'pk_subcategoryID',
      operator: 'EQ',
      value: sub_categoryID
    }]
  }
  common.executeQuery(checkCateGoryValid, cb);
};

/**
 * Created By: CBT
 * Updated By: CBT
 * [removeCategory description]
 * @param  {[type]}   categoryId [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
var removeSubCategory = (sub_categoryId, cb) => {
  debug("sub_category.DAL -> removeSubCategory");
  var removeSubCategoryQuery = common.cloneObject(query.removeSubCategoryQuery);
  removeSubCategoryQuery.filter.value = sub_categoryId;
  common.executeQuery(removeSubCategoryQuery, cb);
};

/**
 * Created By: CBT
 * Updated By: CBT
 * [checkCategoryIsExist description]
 * @param  {[type]}   categoryName [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
var checkSubCategoryIsExist = (sub_category, cb) => {
  debug("sub_category.DAL -> checkDeleteSubCategoryIDValid");
  var checkCateGoryValid = common.cloneObject(query.checkCateGoryValidQuery);
  checkCateGoryValid.filter = {
    and: [{
      field: 'subcategory',
      operator: 'EQ',
      value: sub_category
    }]
  }
  common.executeQuery(checkCateGoryValid, cb);
};





module.exports = {
  createSubCategory: createSubCategory,
  updateSubCategory: updateSubCategory,
  getSubCategory: getSubCategory,
  checkSubCategoryIDValid: checkSubCategoryIDValid,
  removeSubCategory: removeSubCategory,
  checkSubCategoryIsExist: checkSubCategoryIsExist,
};
