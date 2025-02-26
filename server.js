const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const City = require('./models/City');  // City model

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB Atlas (replace with your Atlas connection string)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));

// Route to fetch cities based on user input
app.get('/cities', async (req, res) => {
    const { name, country } = req.query;
    console.log('Received Query Params:', { name, country }); // LOG THIS
  
    try {
        const cities = await City.find({
            name: { $regex: `^${name}$`, $options: 'i' }, // Case-insensitive match
            country: { $regex: `^${country}$`, $options: 'i' }
        });
      console.log('Cities Found:', cities); 
  
      if (cities.length > 0) {
        res.status(200).json(cities);
      } else {
        res.status(404).json({ message: 'No matching city found. Try another search!' });
      }
    } catch (err) {
      console.error('Error fetching cities:', err); // LOG THIS
      res.status(500).json({ message: 'Error fetching cities', error: err });
    }
  });
  

// Route to single objects and arrays
app.post('/cities', async (req, res) => {
    console.log('Received Data:', req.body); // Debugging

    try {
        let citiesToAdd = Array.isArray(req.body) ? req.body : [req.body]; // Convert single object to array
        await City.insertMany(citiesToAdd);
        res.status(201).json({ message: 'Cities added successfully' });
    } catch (err) {
        console.error('Error adding cities:', err);
        res.status(500).json({ message: 'Error adding cities', error: err });
    }
});



// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
