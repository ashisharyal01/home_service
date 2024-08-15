const models = require("../models");
const { sequelize } = require("../models");

exports.saveGallery = async (req, res) =>{
    let t;
    const albumData = {
        title: req.body.title,
        description: req.body.description,
      };
    const photos = req.body.photos
      try {
        await sequelize.transaction(async (t) => {
          let album = await models.Album.create(albumData,{ transaction: t });
          const albumId = album.id
          await Promise.all(
            photos.map(async(photo)=>{
              photo.albumId = albumId
              await models.GalleryPhoto.create(photo, { transaction: t })
            })
          )
        });
       
        res.status(201).json({
          message: "Album Created Successfully!!",
          album: albumData,
        });
      } catch (err) {
        res.status(500).json({
          error: err.message,
        });
      }
}

exports.getGallery = async (req, res) =>{
    try {
        const allAlbum = await models.Album.findAndCountAll({
            include: [
                {
                  model: models.GalleryPhoto,
                  as: "photos",
                  include:[{
                    model: models.FileUpload,
                    as: "albumImage",
                  }]
                }
            ]
        });
        return res.status(200).json(allAlbum);
      } catch (err) {
        res.status(500).json({
          error: err.message,
        });
      }
}

exports.getGalleryById = async (req, res) =>{
    const albumId = req.params.albumId;
    try {
      const album = await models.Album.findByPk(albumId,{
        include: [
            {
              model: models.GalleryPhoto,
              as: "photos",
              include:[{
                model: models.FileUpload,
                as: "albumImage",
              }]
            }
        ]
      });
      return res.status(200).json({albumData: album});
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
}

exports.updateGallery = async(req, res) =>{
    const albumId = req.params.albumId;
    let t;
    const albumData = {
        title: req.body.title,
        description: req.body.description,
      };
    const photos = req.body.photos
    try {
      const previousAlbumData = await models.Album.findOne({
        where: { id: albumId },
      });
      
      await sequelize.transaction(async (t) => {
        await models.Album.update(albumData,{where: { id: albumId }},{ transaction: t });
        if(photos.length > 0){
          await models.GalleryPhoto.destroy({where:{albumId: albumId}})
          await Promise.all(
            photos.map(async(photo)=>{
              photo.albumId = albumId
              await models.GalleryPhoto.create(photo, { transaction: t })
            })
          )
        }
      });
      res.status(201).json({
        message: "Album Updated Successfully!!"
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
}

exports.deleteGallery = async(req, res) =>{
    const albumId = req.params.albumId;
  try {
    await models.Album.destroy({where: {id: albumId}});
    await models.GalleryPhoto.destroy({where: {albumId: albumId}});
    return res.status(200).json({message: 'Album deleted succesfully'});
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}