const models = require('../models');
async function create(req,res){

    let oldaboutusData = await models.aboutus.findAndCountAll();


    if(oldaboutusData.count == 1){
        let aboutusId = oldaboutusData.rows[0].id;
       
        const datas={
        imageId:req.body.imageId,
        title:req.body.title,
        desc:req.body.desc,
    }
    const updatedData=await models.aboutus.update(datas,{where:{id:aboutusId}});
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

    let aboutusData=await models.aboutus.create({
        imageId:req.body.imageId,
        title:req.body.title,
        desc:req.body.desc,
    });
   
    if(aboutusData)
    {
        res.status(201).json({
            message:"AboutUs Created Sucessfully",
            data:aboutusData
        })
    }else{
        res.status(500).json({
            message:"Something went wrong. Please try again"
        });
    }

    }


}
async function show(req,res){
    let aboutusData=await models.aboutus.findAll();
    if(aboutusData){
        res.status(200).json({
            data:aboutusData
        })
    }else{
        res.status(404).json({
            message:"data not found!!!!!!!!"
        })
    }
}
async function showById(req,res){
    const id = req.params.id;
    const aboutusData = await models.aboutus.findByPk(id);
    if(aboutusData){
        res.status(201).json({
            data:aboutusData
        })
    }
    else if(!aboutusData){
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
async function destroy(req,res){
    const id=req.params.id;
  
    const deletedData = await models.aboutus.destroy({where:{id:id}});
    if(deletedData){
        res.status(200).json({
            message:"Data deleted sucessfully"
        })
    }else{
        res.status(500).json({
            message:"Something went wrong. Please try again"
        })
    }
}
module.exports={
    create:create,
    show:show,
    showById:showById,
    destroy:destroy
}