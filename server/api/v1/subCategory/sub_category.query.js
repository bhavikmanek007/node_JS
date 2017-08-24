var tbl_SubCategoryMaster = "tbl_SubCategoryMaster_bhavik";
var tbl_CategoryMaster = "tbl_CategoryMaster";

var query = {
  createSubCategory: {
    table: tbl_SubCategoryMaster,
    insert: []
  },
  updateSubCategory: {
    table: tbl_SubCategoryMaster,
    update: [],
    filter: {
      field: 'pk_subcategoryID',
      operator: 'EQ',
      value: ''
    }
  },
  getSubCategoryQuery: {
    join: {
               table: tbl_SubCategoryMaster,
               alias: 'SCM',
               joinwith: [{
                   table: tbl_CategoryMaster,
                   alias: 'CM',
                   joincondition: {
                       and: [{
                           table: 'SCM',
                           field: 'fk_categoryID',
                           operator: 'eq',
                           value: {
                               table: 'CM',
                               field: 'pk_categoryID'
                           }
                       }]
                   }
               }]
           },
           select: [{
             field: 'SCM.pk_subcategoryID',
             encloseField: false,
             alias: 'sub_category_id'
           },
           {
             field: 'CM.category',
             encloseField: false,
             alias: 'category_name'
           },
           {
           field: 'SCM.subcategory',
           encloseField: false,
           alias: 'sub_category'
           },
           {
           field: 'SCM.description',
           encloseField: false,
           alias: 'description'
           }
           ],
    filter: {}
  },
  checkCateGoryValidQuery: {
    table: tbl_SubCategoryMaster,
    select: [{
      field: 'pk_subcategoryID',
      alias: 'sub_categoryid'
    }
  ],
    filter: {

    },
  },
  removeSubCategoryQuery: {
    table: tbl_SubCategoryMaster,
    delete: [],
    filter: {
      field: 'pk_subcategoryID',
      operator: 'EQ',
      value: ''
    }
  },
}

module.exports = query;
