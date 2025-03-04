const mongoose = require('mongoose');

// Define City Schema
const citySchema = new mongoose.Schema({
  name: String, // name of city
  country: String, // Country
  attractions: [
    {
      name: String, 
      imageUrl: String,
      description: String, 
      ticket: String // Can be a URL or "Free Admission"
    }
  ]
});

const City = mongoose.model('City', citySchema);
module.exports = City;
