const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // prevent access blockage between frontend & backend
require('dotenv').config();
const City = require('./models/City');  

const app = express();

const PORT = process.env.PORT || 5002;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors()); // Add this to allow cross-origin requests

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI, {serverSelectionTimeoutMS: 10000, 
socketTimeoutMS: 45000})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));


// Route to fetch all cities 
app.get('/cities/all', async (req, res) => {
  try {
      const cities = await City.find({});
      console.log('All Cities Found:', cities);

      if (cities.length > 0) {
          res.status(200).json(cities);
      } else {
          res.status(404).json({ message: 'No cities found!' });
      }
  } catch (err) {
      console.error('Error fetching all cities:', err);
      res.status(500).json({ message: 'Error fetching all cities', error: err });
  }
});

// Route to fetch a city based on user input
app.get('/city', async (req, res) => {
    const { name, country } = req.query;
    console.log('Received Query Params:', { name, country });
  
    try {
        const city = await City.find({
          // find a case-insensitive match for name and country input
            name: { $regex: `^${name}$`, $options: 'i' }, 
            country: { $regex: `^${country}$`, $options: 'i' }
        });
      console.log('City Found:', city); 
  
      if (city.length > 0) {
        res.status(200).json(city);
      } else {
        res.status(404).json({ message: 'No matching city found. Try another search!' });
      }
    } catch (err) {
      console.error('Error fetching city:', err); 
      res.status(500).json({ message: 'Error fetching city', error: err });
    }
});

// Route to add a city or multiple cities to DB
app.post('/cities', async (req, res) => {
    console.log('Received Data:', req.body); 

    try {
        let citiesToAdd = Array.isArray(req.body) ? req.body : [req.body]; // Check if data is an array, if it's single convert to an array
        await City.insertMany(citiesToAdd); //insert many cities at once to DB
        res.status(201).json({ message: 'Cities added successfully' });
    } catch (err) {
        console.error('Error adding cities:', err);
        res.status(500).json({ message: 'Error adding cities', error: err });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
