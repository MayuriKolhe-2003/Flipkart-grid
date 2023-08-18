const Challange = require("../models/ChallangesSchema");
const userBrand = require('../models/Brands_PurchesSchema')

const addChallange = async (req, res) => {
    const chData = req.body;
    try {
      const cha = new Challange(chData);
      const savedcha = await cha.save();
      res.json(savedcha);
      //res.status(200).send("product added");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  };


  const getChallange = async (req, res) => {
    try {
      const result = await Challange.find({});
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  const getBrandsInfo = async (req,res)=>{

    const userId = req.query.id;
    const resp = await userBrand.findOne({userId});
    console.log(resp);
    res.send(resp);

}


  module.exports = {addChallange,getChallange,getBrandsInfo}