const express = require("express");
const router = express.Router();
const User = require("../models/user.models");
const transporter = require("../configs/email");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 2;
    const skip = (page - 1) * pagesize;
    const totalPages = Math.ceil(
      (await User.find().countDocuments()) / pagesize
    );
    const user = await User.find().skip(skip).limit(pagesize).lean().exec();
    return res.status(200).send({ user: user, totalPages: totalPages });
  } catch (error) {
    console.log("error:", error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
     transporter.sendMail({
      from: '"Masai School👻" <masai_lms@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: `Welcome to Masai School (LMS) learning management system ${user.first_name}  ${user.last_name}`, // Subject line
      text: ` Hi ${user.first_name}, Please confirm your email address`, // plain text body
      html: ` Hi ${user.first_name}, Please confirm your email address`, // html body
    });

    let admin = [
      "adminOne@gmail.com",
      "adminTwo@gmail.com",
      "adminThree@gmail.com",
      "adminFour@gmail.com",
      "adminFive@gmail.com",
    ];
    for (i = 0; i < admin.length; i++) {
      await transporter.sendMail({
        from: '"Masai School👻" <masai_lms@gmail.com>', // sender address
        to: admin[i], // list of receivers
        subject: `${user.first_name}  ${user.last_name} has registered with us`, // Subject line
        text: ` Please welcome ${user.first_name}  ${user.last_name}`, // plain text body
        html: ` Please welcome ${user.first_name}  ${user.last_name}`, // html body
      });
    }

      return res.status(201).send({ message: "registration successfully done" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send({ user: user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body)
      .lean()
      .exec();
    return res.status(200).send({ user: user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    return res.status(200).send({ user: user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
