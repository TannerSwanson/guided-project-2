
import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

app.get('/api/planets', async (req, res) => {
    try {
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("planets");
        const socks = await collection.find({}).toArray();
        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
