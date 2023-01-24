const express = require("express");
const middleware = require("../controllers/middleware");
const Job = require("../models/jobs.model");
const app = express.Router();

app.use(middleware);

app.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (e) {
    res.status(404).send({message: e.message});
  }
});

app.patch("/update/:id", async (req, res) => {
  const {id} = req.params;
  const {company, position, contract, location} = req.body;

  if (!company && !position && !contract && !location) {
    return res
      .status(404)
      .send({message: "Change atleast one detail to update"});
  }

  try {
    const jobs = await Job.findByIdAndUpdate(
      {_id: id},
      {
        company,
        position,
        contract,
        location,
      },
      {new: true}
    );
    res.status(200).send(jobs);
  } catch (e) {
    res.status(404).send({message: e.message});
  }
});
app.delete("/delete/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const jobs = await Job.findByIdAndDelete({_id: id});
    res.status(200).send(jobs);
  } catch (e) {
    res.status(404).send({message: e.message});
  }
});

app.post("/", async (req, res) => {
  const {company, position, contract, location} = req.body;
  if (!company || !position || !contract || !location) {
    return res.status(404).send({message: "Missing Details"});
  }
  try {
    const isExist = await Job.findOne({company, position, location});
    if (isExist) {
      return res.send({
        message: `The position of ${position} in ${company} company at ${location} is already registered`,
      });
    }

    const job = new Job({company, position, contract, location});
    await job.save();

    res.status(200).send(job);
  } catch (e) {
    res.status(404).send({message: e.message});
  }
});
module.exports = app;
