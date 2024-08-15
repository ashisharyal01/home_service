const model = require('../models');
const PaginationData = require("../utils/pagination")
exports.saveCategory = async (req,res) =>{
    const categoryData = {
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
    }
    try{
        let newCategory = await model.category.create(categoryData);
        res.status(201).json({
            message:"category created sucessfully",
            data:newCategory
        })

    }catch(err){
        
        res.status(500).json({
           error:err.message,
            message:"Internal Server Error"
        })
    }
}

exports.getCategory = async (req,res) =>{
    try{
         let categories = await model.category.findAndCountAll();
       return  res.status(200).json({
        data:categories
        })

    }catch(err){
        res.status(500).json({
           error:err.message,
            message:"Internal Server Error"
        })
    }

}

// exports.paginateCategory = async (req,res) =>{
//     try{
//         const { page=0, size=10} = req.query;
//         const { limit, offset } = PaginationData.getPagination(page, size);

//          let categories = await model.category.findAndCountAll({ limit, offset });
//        return  res.status(200).json({
//         data:PaginationData.getPagingData(categories, page, limit)
//         })

//     }catch(err){
//         res.status(500).json({
//            error:err.message,
            message:"Internal Server Error"
//         })
//     }

// }

exports.showCategoryById = async (req,res) =>{
    const categoryId = req.params.id;
  
    try{
        let categories  = await model.category.findByPk(categoryId)
        res.status(200).json({
            data:categories
        })

    }catch(err){
        res.status(500).json({
           error:err.message,
            message:"Internal Server Error"
        })
    }
}

exports.updateCategory = async (req,res) =>{
    const categoryId = req.params.id;
    const categoryData = {
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription
    }
    try{
        let newCategory = await model.category.update(categoryData,{where:{id:categoryId}});
        res.status(201).json({
            message:"category updated sucessfully",
            data:newCategory
        })

    }catch(err){
        res.status(500).json({
           error:err.message,
            message:"Internal Server Error"
        })
    }
}

exports.deleteCategory = async (req,res) =>{
  const categoryId = req.params.id;
    try{
         await model.category.destroy({where:{id:categoryId}});
        res.status(200).json({
            message:"category deleted sucessfully",
        })

    }catch(err){
        res.status(500).json({
           error:err.message,
            message:"Internal Server Error"
        })
    }
}