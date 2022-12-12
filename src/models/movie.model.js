const mongoose = require("mongoose");
const Genre = require("./genre.model");
const Person = require("./person.model");
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  direction: {
    type: Object,
    ref: Person,
  },
  cast: {
    type: Array,
    ref: Person,
    required: true,
  },
  screenwrite: {
    type: Object,
    ref: Person,
  },
  sinopse: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  distributor: {
    type: String,
    required: true,
  },
  yearOfManufacture: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  genre: {
    type: Object,
    ref: Genre,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
