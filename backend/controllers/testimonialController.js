const model = require("../models");
async function create(req, res) {
  let data = {
    name: req.body.name,
    message: req.body.message,
    rating: req.body.rating,
  };
  const testimonialModel = await model.Testimonial.create(data);
  if (testimonialModel) {
    res.status(201).json({
      message: "Testimonial Created Sucessfully",
      data: testimonialModel,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
}

async function show(req, res) {
  const TestimonialData = await model.Testimonial.findAll();
  if (TestimonialData) {
    res.status(200).json({
      data: TestimonialData,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
}

async function showById(req, res) {
  const testimonialId = req.params.id;
  console.log("id is", req.params.id);
  const testimonialData = await model.Testimonial.findByPk(testimonialId);
  if (testimonialData) {
    res.status(201).json({
      data: testimonialData,
    });
  } else if (!testimonialData) {
    res.status(404).json({
      message: "data not found",
    });
  } else {
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
}

async function update(req, res) {
  const id = req.params.id;
  const datas = {
    // id: req.body.id,
    name: req.body.name,
    message: req.body.message,
    rating: req.body.rating,
  };
  const updatedData = await model.Testimonial.update(datas, {
    where: { id: id },
  });
  if (updatedData) {
    res.status(201).json({
      message: "Data updated Sucessfully",
      data: updatedData,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
}

async function destroy(req, res) {
  const id = req.params.id;
  const deletedData = await model.Testimonial.destroy({ where: { id: id } });
  if (deletedData) {
    res.status(200).json({
      message: "Data deleted sucessfully",
    });
  } else {
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
}

module.exports = {
  create: create,
  show: show,
  showById: showById,
  update: update,
  destroy: destroy,
};
