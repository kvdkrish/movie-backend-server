const { Schema, model } = require('mongoose');

const Director = new Schema({
  name: String,
  age: Number,
  photo: String,
});

module.exports = model('Director', Director);
