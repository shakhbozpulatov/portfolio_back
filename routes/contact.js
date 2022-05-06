const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");

const Namee = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   minlength: 3,
  //   maxlength: 50,
  // },
  // message: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  //   maxlength: 200,
  // },
});

const myPortfolio = mongoose.model("myPortfolio", Namee);

// router.get("/", async (req, res) => {
//   const contactData = await myPortfolio.find();
//   res.send(contactData);
// });

router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new myPortfolio({
    name: req.body.name,
  });
  category = await category.save();

  res.status(201).send(category);
});

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(category);
}

module.exports = router;
