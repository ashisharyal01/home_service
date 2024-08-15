const models = require("../models");
const { sequelize } = require("../models");

exports.saveSlider = async (req, res) =>{

    let oldsliderImageData = await models.SliderImage.findAndCountAll();
    if(oldsliderImageData.count == 1){
        await models.Photo.destroy({where: {sliderImageId: oldsliderImageData.rows[0].id}});
        await models.SliderImage.destroy({where: {id: oldsliderImageData.rows[0].id}});
    }
        let t;
        const sliderData = {
            title: req.body.title,
            description: req.body.description,
          };
        const photos = req.body.photos
          try {
            await sequelize.transaction(async (t) => {
              let sliders = await models.SliderImage.create(sliderData,{ transaction: t });
              const slidersId = sliders.id
              await Promise.all(
                photos.map(async(photo)=>{
                  photo.sliderImageId = slidersId
                  await models.Photo.create(photo, { transaction: t })
                })
              )
            });
           
            res.status(201).json({
              message: "slider Created Successfully!!",
              sliders: sliderData,
            });
          } catch (err) {
            res.status(500).json({
              error: err.message,
            });
          }
}

exports.getSliderImage = async (req, res) =>{
    try {
        const allSlider = await models.SliderImage.findAndCountAll({
            include: [
                {
                  model: models.Photo,
                  as: "photos",
                  include:[{
                    model: models.FileUpload,
                    as: "sliderImages",
                  }]
                }
            ]
        });
        return res.status(200).json(allSlider);
      } catch (err) {
        res.status(500).json({
          error: err.message,
        });
      }
}



