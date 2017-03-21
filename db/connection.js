const mongoose = require('mongoose');
const ChampSchema = new mongoose.Schema(
  {
    name: String,
    lane: String,
    imgUrl: String,
    difficulty: Number
  }
)

mongoose.model("Champ", ChampSchema)
mongoose.connect("mongodb://localhost/champs")

module.exports = mongoose
