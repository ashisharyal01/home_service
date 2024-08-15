const models = require('../models');
const paginationService = require('../services/pagination.service')


exports.GlobalPagination = async(req,res)=>{
    await paginationService.GlobalPagination(req,res);
}

