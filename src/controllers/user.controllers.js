const express = require("express");
const router = express.Router();
const User = require("../models/user.models");

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
router.post("", async (req, res) => {
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
    return res.status(500).send(error.message);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
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
    const user = await User.findById(req.params.id)
      .lean()
      .exec();
    return res.status(200).send({ user: user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
