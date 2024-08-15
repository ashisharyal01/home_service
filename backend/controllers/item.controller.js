const ItemServices = require('../services/item.service')

exports.saveItem = async(req,res)=>{
    await ItemServices.saveItem(req,res);
}
exports.getItem = async(req,res)=>{
    await ItemServices.getItem(req,res);
}
exports.showItemById = async(req,res)=>{
    await ItemServices.showItemById(req,res);
}
exports.updateItem = async(req,res)=>{
    await ItemServices.updateItem(req,res);
}
exports.deleteItem = async(req,res)=>{
    await ItemServices.deleteItem(req,res);
}
