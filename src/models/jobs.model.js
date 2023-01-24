const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {type: String, require: true},
    position: {type: String, require: true},
    contract: {type: String, require: true},
    location: {type: String, require: true},
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("job", JobSchema);

module.exports = Job;
