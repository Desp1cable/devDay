const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  score: {type: Number, required: true}
})

module.exports = mongoose.model("Users", schema)