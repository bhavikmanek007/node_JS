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
var createSubCategory = async function (fieldValue) {
  debug("sub_category.DAL -> createSubCategory");
  var createSubCategory = common.cloneObject(query.createSubCategory);
  createSubCategory.insert = fieldValue;
  return await common.executeQuery(createSubCategory);
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
var updateSubCategory = async function (fieldValue, sub_categoryID) {
  debug("sub_category.DAL -> updateSubCategory");
  var updateSubCategory = common.cloneObject(query.updateSubCategory);
  updateSubCategory.update = fieldValue;
  updateSubCategory.filter.value = sub_categoryID;
  return await common.executeQuery(updateSubCategory);
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
var getSubCategory = async function (sub_categoryID, isActive, dbServerDateTime, limit) {
  debug("sub_category.DAL -> getSubCategory");
  var getSubCategoryQuery = common.cloneObject(query.getSubCategoryQuery);
  var sub_categoryFilter = {
    and: []
  }
  if (sub_categoryID > 0) {
    sub_categoryFilter.and.push({
      field: 'SCM.pk_subcategoryID',
      encloseField: false,
      operator: 'EQ',
      value: sub_categoryID
    });
  }
  else{
    delete getSubCategoryQuery.filter;
  }

  console.log("############################################################################dal");
  console.log(common.executeQuery(getSubCategoryQuery));
  return await common.executeQuery(getSubCategoryQuery);
};




/**
 * Created By: CBT
 * Updated By: CBT
 * [checkCategoryIDValid description]
 * @param  {[type]}   categoryID [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
var checkSubCategoryIDValid = async function (sub_categoryID) {
  debug("sub_category.DAL -> checkDeleteSubCategoryIDValid");
  var checkCateGoryValid = common.cloneObject(query.checkCateGoryValidQuery);
  checkCateGoryValid.filter = {
    and: [{
      field: 'pk_subcategoryID',
      operator: 'EQ',
      value: sub_categoryID
    }]
  }
  return await common.executeQuery(checkCateGoryValid);
};

/**
 * Created By: CBT
 * Updated By: CBT
 * [removeCategory description]
 * @param  {[type]}   categoryId [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
var removeSubCategory = async function (sub_categoryId) {
  debug("sub_category.DAL -> removeSubCategory");
  var removeSubCategoryQuery = common.cloneObject(query.removeSubCategoryQuery);
  removeSubCategoryQuery.filter.value = sub_categoryId;
  return await common.executeQuery(removeSubCategoryQuery);
};

/**
 * Created By: CBT
 * Updated By: CBT
 * [checkCategoryIsExist description]
 * @param  {[type]}   categoryName [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
var checkSubCategoryIsExist = async function (sub_category) {
  debug("sub_category.DAL -> checkDeleteSubCategoryIDValid");
  var checkCateGoryValid = common.cloneObject(query.checkCateGoryValidQuery);
  checkCateGoryValid.filter = {
    and: [{
      field: 'subcategory',
      operator: 'EQ',
      value: sub_category
    }]
  }
  return await common.executeQuery(checkCateGoryValid);
};





module.exports = {
  createSubCategory: createSubCategory,
  updateSubCategory: updateSubCategory,
  getSubCategory: getSubCategory,
  checkSubCategoryIDValid: checkSubCategoryIDValid,
  removeSubCategory: removeSubCategory,
  checkSubCategoryIsExist: checkSubCategoryIsExist,
};
