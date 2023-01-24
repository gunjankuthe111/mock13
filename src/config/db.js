const mongoose = require("mongoose")

const connectDB = async()=>{
    return mongoose.connect(process.env.DB_URL)
}

module.exports = connectDB