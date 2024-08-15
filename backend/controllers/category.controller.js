const categoryServices = require('../services/category.service')

exports.saveCategory = async(req,res)=>{
    await categoryServices.saveCategory(req,res);
}
exports.getCategory = async(req,res)=>{
    await categoryServices.getCategory(req,res);
}
exports.paginateCategory = async(req,res)=>{
    await categoryServices.paginateCategory(req,res);
}
exports.showCategoryById = async(req,res)=>{
    await categoryServices.showCategoryById(req,res);
}
exports.updateCategory = async(req,res)=>{
    await categoryServices.updateCategory(req,res);
}
exports.deleteCategory = async(req,res)=>{
    await categoryServices.deleteCategory(req,res);
}
