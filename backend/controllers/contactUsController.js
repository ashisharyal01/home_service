const models = require('../models');
async function create(req,res){

    let oldContactUsData = await models.ContactUs.findAndCountAll();


    if(oldContactUsData.count == 1){
        let contactUsId = oldContactUsData.rows[0].id;
       
        const datas={
        email:req.body.email,
        fullName:req.body.fullName,
        message:req.body.message,
        subject:req.body.subject,
        phoneNumber:req.body.phoneNumber,

    }
    const updatedData=await models.ContactUs.update(datas,{where:{id:contactUsId}});
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

        
    let ContactUsData=await models.ContactUs.create({
        email:req.body.email,
        fullName:req.body.fullName,
        message:req.body.message,
        subject:req.body.subject,
        phoneNumber:req.body.phoneNumber,
    });
   
    if(ContactUsData)
    {
        res.status(201).json({
            message:"Contact Created Sucessfully",
            data:ContactUsData
        })
    }else{
        res.status(500).json({
            message:"Something went wrong. Please try again"
        });
    }

    }


}
async function show(req,res){
    
    let ContactUsData = await models.ContactUs.findAll();
    if(ContactUsData){
        return res.status(200).json({
        data:ContactUsData
        })
    }else{
        res.status(404).json({
            message:"data not found !!"
        })
    }


}
async function showById(req,res){
    const id = req.params.id;
    const ContactUsData = await models.ContactUs.findByPk(id);
    if(ContactUsData){
        res.status(201).json({
            data:ContactUsData
        })
    }
    else if(!ContactUsData){
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
  //  const contact = await models.ContactUs.findByPk(id);
    const deletedData = await models.ContactUs.destroy({where:{id:id}});
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



module.exports = {
   
    create:create,
    show:show,
    showById:showById,
    destroy:destroy

}