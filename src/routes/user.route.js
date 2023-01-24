const express = require("express");
const middleware = require("../controllers/middleware");
const Job = require("../models/jobs.model");
const app = express.Router();

app.use(middleware);

app.get("/", async (req, res) => {
  const {company, location, contract} = req.query;
  try {
    let jobs = await Job.find();
    if(company){
      jobs = jobs.filter(ele=>ele.company===company)
    }
    if(location){
      jobs = jobs.filter(ele=>ele.location===location)
    }
    if(contract){
      jobs = jobs.filter(ele=>ele.contract===contract)
    }

    return res.status(200).send(jobs);
  } catch (e) {
    res.status(404).send({message: e.message});
  }
});


module.exports = app;
