var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

// new Schema
var myRetailSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  current_price: {
    value: { type: Number },
    currency_code: { type: String }
  }
});

module.exports = mongoose.model("movies", myRetailSchema);
