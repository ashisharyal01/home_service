const orderServices = require('../services/order.service')

exports.saveOrder = async(req,res)=>{
    await orderServices.saveOrder(req,res);
}
exports.getOrder = async(req,res)=>{
    await orderServices.getOrder(req,res);
}
exports.showOrderById = async(req,res)=>{
    await orderServices.showOrderById(req,res);
}
exports.updateWorkStatus = async(req,res)=>{
    await orderServices.updateWorkStatus(req,res);
}
exports.deleteOrder = async(req,res)=>{
    await orderServices.deleteOrder(req,res);
}
