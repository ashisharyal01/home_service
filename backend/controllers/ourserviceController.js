const models = require('../models');

async function create(req,res){

    let oldOurService = await models.OurService.findAndCountAll();


    if(oldOurService.count == 1){
        let ourServiceId = oldOurService.rows[0].id;
       
        const datas={
        imageId:req.body.imageId,
        title:req.body.title,
        desc:req.body.desc,
    }
    const updatedData=await models.OurService.update(datas,{where:{id:ourServiceId}});
    if(updatedData){
        res.status(201).json({
            message:"Data updated Sucessfully",
            data:datas
        })
    }else{
        res.status(500).json({
            message:"Something went wrong. Please try again"
        })
    }


    }else{
    let ourServicedata=await models.OurService.create({
        imageId:req.body.imageId,
        title:req.body.title,
        desc:req.body.desc,
    });
   
    if(ourServicedata)
    {
        res.status(201).json({
            message:"Our Service Created Sucessfully",
            data:ourServicedata
        })
    }else{
        res.status(500).json({
            message:"Something went wrong. Please try again"
        });
    }

    }


}

async function show(req,res){
    let ourServicedata=await models.OurService.findAll();
    if(ourServicedata){
        res.status(200).json({
            data:ourServicedata
        })
    }else{
        res.status(404).json({
            message:"data not found!!!!!!!!"
        })
    }
}
async function showById(req,res){
    const id = req.params.id;
    const ourServicedata = await models.OurService.findByPk(id);
    if(ourServicedata){
        res.status(201).json({
            data:ourServicedata
        })
    }
    else if(!ourServicedata){
        res.status(404).json({
            message:"data not found"
        })
    }
    else{
        res.status(500).json({
            message:"Something went wrong. Please try again"
        })
    }


    
}

module.exports={
    create:create,
    show:show,
    showById:showById
}