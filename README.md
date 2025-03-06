# 🌍 World Tourist Attractions API  

## Project Overview  
World Tourist Attractions API is a custom RESTful API I designed to provide information about popular cities and their top tourist attractions. Users can search for a city within a country to retrieve the names, images, descriptions, and ticket information for each main attraction.  

**Disclaimer:** This API was created for **project and educational purposes only**. I made great efforts to use copyright-free images,however, some images may be subject to copyright. If using this API publicly, ensure compliance with copyright laws.  

## Features  
- Retrieve tourist attractions by city and country  
- Provides images, descriptions, and ticket links (if applicable)  
- Built to be used with **any frontend application**  
- Uses a **MongoDB, Express.js, and Node.js** for the backend  

## Technologies Used  
- **MongoDB**  
- **Express.js**  
- **Node.js** 
- **Postman**  
- **Git & GitHub**  
- **Render.com** 

## API Endpoints  

### Get All Cities  
```
GET /cities/all
```
Returns all available cities and their attractions.  

### Search by City & Country  
```
GET /city?name={city}&country={country}
```
Returns tourist attractions for a specific city. Example request:  
```
http://localhost:5001/city?name=New%20York&country=United%20States

```
**Response Example:**  
```json
{
  "name": "New York",
  "country": "United States",
  "attractions": [
    {
      "name": "Statue of Liberty",
      "imageUrl": "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg",
      "description": "An iconic symbol of freedom and democracy, welcoming visitors to New York Harbor since 1886.",
      "ticket": "https://www.nps.gov/stli/planyourvisit/fees.htm"
    }
  ]
}
```

##  Installation & Setup  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/yourusername/worldtouristattractions.git
   cd worldtouristattractions
   ```
2. **Install dependencies:**  
   ```bash
   npm install
   ```
3. **Set up environment variables:**  
   - Create a `.env` file and add:  
     ```
     PORT=5001
     MONGO_URI=your_mongodb_connection_string
     ```
4. **Run the server locally:**  
   ```bash
   node server.js
   ```
   - The API should now be available at `http://localhost:5001/`.  

## Testing

This project uses Jest and Supertest for testing API endpoints. The tests run against an in-memory MongoDB database to prevent any interaction with the real database.

### Running Tests

1. Install dependencies:
   ```bash
   npm install

## Run tests
npm test

## Challenges Faced

I encountered a few challenges during the development of this project, mainly around correctly handling POST requests with multiple cities and configuring my testing environment. 

### 1. Handling Multiple City Inserts
- Initially, the POST route was set up to only insert a single city into the database. 
- I later realized that I wanted to handle both single and multiple city inserts. The issue arose when I tried to send an array of cities, but my route was not configured to handle both single cities and arrays of cities. 
- After fixing the POST route, I used the `Array.isArray()` method to check if the incoming data was an array so it would be compatible with the `insertMany()` method, which handles the insertion of multiple cities.

### 2. Testing Setup Configuration
- The tests were initially failing because I did not correctly separate the Express production server from the testing environment's server. 
- Once I understood the error messages, I had to ensure the Express server could run in a testing environment by exporting the app instance to use with Jest and Supertest without invoking the `app.listen()` method, which is used only for production.


## Deployment  
The API is deployed on **Render.com**. Replace `localhost` with your deployed URL in API requests.  

