const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); // Import MongoMemoryServer to use a mock DB

// Import app and models
const app = require('../server'); 
const City = require('../models/City');

let mongoServer;

beforeAll(async () => {
    // Create instance for in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    // Get URI for mock DB
    const uri = mongoServer.getUri(); 
    // Connect to mock database if not already connected
    if (mongoose.connection.readyState === 0) {  // Ensure no active connection
        await mongoose.connect(uri);  
    }
}, 10000); // Increase timeout for beforeAll if needed

afterAll(async () => {
    // Close connection after tests
    await mongoose.connection.close();
    // Stop the in-memory server
    await mongoServer.stop();  
}, 10000); // Increase timeout for afterAll if needed

describe('City API Endpoints', () => {
    it('should fetch all cities', async () => {
        const res = await request(app).get('/cities/all');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should add a city', async () => {
        const newCity = { name: "Atlantis", country: "Ocean", attractions: [] };
        const res = await request(app).post('/cities').send(newCity);
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Cities added successfully");
    });

    it('should fetch a city by name & country', async () => {
        const res = await request(app).get('/city?name=Atlantis&country=Ocean');
        expect(res.statusCode).toBe(200);
        expect(res.body[0].name).toBe("Atlantis");  
        expect(res.body[0].country).toBe("Ocean");  
    });
});
