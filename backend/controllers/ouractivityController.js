const models = require('../models');

async function create(req,res){

    let oldOurActivity = await models.OurActivity.findAndCountAll();


    if(oldOurActivity.count == 1){
        let ourActivityId = oldOurActivity.rows[0].id;
       
        const datas={
        imageId:req.body.imageId,
        title:req.body.title,
        desc:req.body.desc,
    }
    const updatedData=await models.OurActivity.update(datas,{where:{id:ourActivityId}});
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
    let ourActivityData=await models.OurActivity.create({
        imageId:req.body.imageId,
        title:req.body.title,
        desc:req.body.desc,
    });
   
    if(ourActivityData)
    {
        res.status(201).json({
            message:"Our Activity Created Sucessfully",
            data:ourActivityData
        })
    }else{
        res.status(500).json({
            message:"Something went wrong. Please try again"
        });
    }

    }


}

async function show(req,res){
    let ourActivityData=await models.OurActivity.findAll();
    if(ourActivityData){
        res.status(200).json({
            data:ourActivityData
        })
    }else{
        res.status(404).json({
            message:"data not found!!!!!!!!"
        })
    }
}
async function showById(req,res){
    const id = req.params.id;
    const ourActivityData = await models.OurActivity.findByPk(id);
    if(ourActivityData){
        res.status(201).json({
            data:ourActivityData
        })
    }
    else if(!ourActivityData){
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