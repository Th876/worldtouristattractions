const mongoose = require('mongoose');

// Define the City Schema
const citySchema = new mongoose.Schema({
  name: String, // City name
  country: String, // Country
  attractions: [
    {
      name: String, 
      imageUrl: String,
      description: String, 
       // Can be a URL or "free"
      ticket: String       
    }
  ]
});

const City = mongoose.model('City', citySchema);
module.exports = City;
