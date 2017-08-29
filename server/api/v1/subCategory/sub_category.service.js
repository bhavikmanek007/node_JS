var debug = require('debug')('server:api:v1:inventory:service');
var uuid = require('uuid');
var common = require('../common');
var constant = require('../constant');
var sub_categoryDAL = require('./sub_category.DAL');
var dbDateFormat = constant.appConfig.DB_DATE_FORMAT;
var d3 = require("d3");
var otherService = require('../other/other.service');
var otherDAL = require('../other/other.DAL');
var async = require('async');
var series = require('async/series');


/**
 * Created By: CBT
 * Updated By: CBT
 * [addUpdateCategoryService description]
 * @param {[type]}   request [description]
 * @param {Function} cb      [description]
 */
var addUpdateSubCategoryService = async function (request, response) {
  debug("sub_category.service -> updateSubCategoryService", request.body);
  var isValidObject = common.validateObject([request.body]);
  var isValid = common.validateParams([request.body.category_name,request.body.category_id,request.body.country_code,request.body.number,request.body.password]);
  if(!isValidObject){
    return await common.sendResponse(response,constant.requestMessages.ERR_INVALID_CATEGORY_ADD_REQUEST,false);
  }
  else if(!isValid){
    return await common.sendResponse(response,constant.requestMessages.ERR_INVALID_CATEGORY_ADD_REQUEST,false);
  }
  var sub_categoryID = request.body.sub_category_id;
  var userID = request.session.userInfo.userId;
  var categoryID = request.body.category_type_id;
  var sub_categoryName = request.body.sub_category;
  var description = request.body.description;
  var imageObj = "";
  var image = '';

  var fileObj = imageObj;
  try{
    if (fileObj != undefined && Object.keys(fileObj).length > 0) {
      var result = await otherService.imageUploadMoving(fileObj, constant.appConfig.MEDIA_MOVING_PATH.CATEGORY);
      image = result.data.file;
    }
    await addUpdateSubCategory(sub_categoryID, userID, categoryID, sub_categoryName, description, image, request, response);

  }
  catch(ex){
    return await common.sendResponse(response,constant.userMessages.MSG_ERROR_IN_QUERY,false);
  }
};

/**
 * Created By: CBT
 * Updated By: CBT
 * [addUpdateCategory description]
 * @param {[type]}   categoryID       [description]
 * @param {[type]}   userID           [description]
 * @param {[type]}   categoryName     [description]
 * @param {[type]}   description      [description]
 * @param {[type]}   image            [description]
 * @param {[type]}   request          [description]
 * @param {Function} cb               [description]
 */
addUpdateSubCategory = async function (sub_categoryID, userID, categoryID, sub_categoryName, description, image, request, response) {
  var fullUrl = common.getGetMediaURL(request);
  var sub_categoryinfo = {};
  sub_categoryinfo.createdBy = userID;
  sub_categoryinfo.subcategory = sub_categoryName;
  sub_categoryinfo.description = description;
  sub_categoryinfo.fk_categoryID = categoryID;

  if (image != '')
    sub_categoryinfo.imageName = image; //   categoryinfo.imageName = fullUrl + image;
  else
    sub_categoryinfo.imageName = '';

  var sub_categoryKeys = Object.keys(sub_categoryinfo);
  var fieldValueInsert = [];
  sub_categoryKeys.forEach((sub_categoryKey) => {
    if (sub_categoryinfo[sub_categoryKey] !== undefined) {
      var fieldValueObj = {};
      fieldValueObj = {
        field: sub_categoryKey,
        fValue: sub_categoryinfo[sub_categoryKey]
      }
      fieldValueInsert.push(fieldValueObj);
    }
  });
    try{

      if (sub_categoryID <= 0) {
        debug("resulted final Add category object -> ", fieldValueInsert);
        let result = await sub_categoryDAL.checkSubCategoryIsExist(sub_categoryinfo.subcategory)

        if (result.status === true && result.content.length != 0) {
          return await common.sendResponse(response, constant.categoryMessages.ERR_CATEGORY_EXIST,false);
        }
        if (result.status == true && result.content.length === 0) {
         let res_create_cat = await sub_categoryDAL.createSubCategory(fieldValueInsert)
         return await common.sendResponse(response, constant.categoryMessages.CATEGORY_ADD_SUCCESS,true);
        }
      } else {
        modifiedObj = {
          field: "modifiedDate",
          fValue: d3.timeFormat(dbDateFormat)(new Date())
        }


        let result = await sub_categoryDAL.checkSubCategoryIDValid(sub_categoryID);


        if (result.content.length === 0) {
          return await common.sendResponse(response, constant.categoryMessages.ERR_REQUESTED_USER_NO_PERMISSION_OF_CATEGORY_UPDATE,false);
        }
        if (result.content[0].imageName != "" && result.content[0].imageName != undefined && fieldValueInsert[3].fValue == "")
            fieldValueInsert[3].fValue = result.content[0].imageName;

          fieldValueInsert.push(modifiedObj);

          debug("resulted final Update category object -> ", fieldValueInsert);

          let res_update_cate = await sub_categoryDAL.updateSubCategory(fieldValueInsert, sub_categoryID);
          return await common.sendResponse(response, constant.categoryMessages.CATEGORY_UPDATE_SUCCESS,true);
      }

    }
    catch(ex){
      throw  ex;
    }
  }

/**
 * Created By: CBT
 * Updated By: CBT
 * [getCategoryService description]
 * @param  {[type]}   request [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
var getSubCategoryService = async function (request, response) {
  debug("SubCategory.service -> getSubCategoryService");
  console.log("############################################################################33");
  var getPaginationObject = common.getPaginationObject(request);
  var dbServerDateTime = getPaginationObject.dbServerDateTime;
  var limit = getPaginationObject.limit;
  var pageNo = getPaginationObject.pageNo;
  var serverDateTime = getPaginationObject.serverDateTime
  var sub_categoryID = request.params.sub_categoryID;

  var activeStatus = 1;
  if (request.params.activeStatus != undefined && request.params.activeStatus != "") {
    if (constant.appConfig.VALID_ACTIVE_STATUS_PARAM.indexOf(request.params.activeStatus) > -1) {
      activeStatus = request.params.activeStatus;
    } else {
      return await  common.sendResponse(response, constant.categoryMessages.INVALID_ACTIVE_PARAM,false);
    }
  }
  try{
    let result = await sub_categoryDAL.getSubCategory(sub_categoryID, activeStatus, dbServerDateTime, limit);
    var fullUrl = common.getGetMediaURL(request);
    console.log("############################################################################33");
    result.content.forEach(function (category) {
      if (category.image_name != undefined && category.image_name != "") {
        category.image_name = common.getGetMediaURL(request) + constant.appConfig.MEDIA_UPLOAD_SUBFOLDERS_NAME.CATEGORY + "large/" + category.image_name;
      } else {
        category.image_name = common.getNoImageURL(request);
      }
    });
    return await common.sendResponse(response, result.content,true);

  }
  catch(ex){
    console.log("############################################################################error");
    debug(ex);
    return await common.sendResponse(response, constant.categoryMessages.ERR_NO_CATEGORY_FOUND,false);
  }


};



/**
 * Created By: CBT
 * Updated By: CBT
 * [deleteCategoryService description]
 * @param  {[type]}   request [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
var deleteSubCategoryService = async (request, response) => {
  debug("SubCategory.service -> deleteSubCategoryService", request.params.sub_categoryID);


  let isValid = common.validateParams([request.params.categoryID])
  if(!isValid){
      return await  common.sendResponse(response,constant.categoryMessages.ERR_INVALID_CATEGORY_DELETE_REQUEST,false);
  } else {
    var pk_subcategoryID = request.params.sub_categoryID;

      let result = await sub_categoryDAL.checkSubCategoryIDValid(pk_subcategoryID);
      if (result.content.length === 0) {
        return common.sendResponse(response,constant.categoryMessages.ERR_REQUESTED_USER_NO_PERMISSION_OF_CATEGORY_REMOVE,false);
      }
      let res_remove_cat = await sub_categoryDAL.removeSubCategory(pk_subcategoryID);
        return common.sendResponse(response,constant.categoryMessages.MSG_CATEGORY_REMOVE_SUCCESSFULLY,true);

  }

};



module.exports = {
  addUpdateSubCategoryService: addUpdateSubCategoryService,
  getSubCategoryService: getSubCategoryService,
  deleteSubCategoryService: deleteSubCategoryService,
};
