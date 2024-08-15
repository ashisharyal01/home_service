const CustomerServices = require('../services/customer.service')

exports.saveCustomer = async(req,res)=>{
    await CustomerServices.saveCustomer(req,res);
}
exports.getCustomer = async(req,res)=>{
    await CustomerServices.getCustomer(req,res);
}
exports.getCustomerByTransaction = async(req,res)=>{
    await CustomerServices.getCustomerByTransaction(req,res);
}
exports.getCustomerByOrder = async(req,res)=>{
    await CustomerServices.getCustomerByOrder(req,res);
}
exports.showCustomerById = async(req,res)=>{
    await CustomerServices.showCustomerById(req,res);
}
exports.updateCustomer = async(req,res)=>{
    await CustomerServices.updateCustomer(req,res);
}
exports.deleteCustomer = async(req,res)=>{
    await CustomerServices.deleteCustomer(req,res);
}
exports.FilterCustomer = async(req,res)=>{
    await CustomerServices.FilterCustomer(req,res); 
}
