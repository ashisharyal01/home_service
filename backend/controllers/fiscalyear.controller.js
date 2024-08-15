const fiscalyearServices = require('../services/fiscalyear.service')

exports.savefiscalyear = async(req,res)=>{
    await fiscalyearServices.savefiscalyear(req,res);
}
exports.getfiscalyear = async(req,res)=>{
    await fiscalyearServices.getfiscalyear(req,res);
}
exports.showfiscalyearById = async(req,res)=>{
    await fiscalyearServices.showfiscalyearById(req,res);
}
exports.updatefiscalyear = async(req,res)=>{
    await fiscalyearServices.updatefiscalyear(req,res);
}
exports.updateFiscalYearState = async(req,res)=>{
    await fiscalyearServices.updateFiscalYearState(req,res);
}
exports.deletefiscalyear = async(req,res)=>{
    await fiscalyearServices.deletefiscalyear(req,res);
}
exports.FilterByFiscalYear = async(req,res)=>{
    await fiscalyearServices.FilterByFiscalYear(req,res);
}
