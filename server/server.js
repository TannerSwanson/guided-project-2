
import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

app.get('/api/characters', async (req, res) => {
    try {
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("characters");
        const char = await collection.find({}).toArray();
        if (char.length === 0) {
            res.status(404).send("No results found!");
        }
        res.json(char);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("films");
        const film = await collection.find({}).toArray();
        if (film.length === 0) {
            res.status(404).send("No results found!");
        }
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("planets");
        const planet = await collection.find({}).toArray();
        if (planet.length === 0) {
            res.status(404).send("No results found!");
        }
        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("characters");
        const chars = await collection.find({ id : parseInt(id) }).toArray(); // updated filter
        if (chars.length === 0) {
            res.status(404).send("No results found!");
        }
        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("films");
        const film = await collection.find({ id : parseInt(id) }).toArray(); // update filter
        if (film.length === 0) {
            res.status(404).send("No results found!");
        }
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("planets");
        const planet = await collection.find({ id : parseInt(id) }).toArray(); // updated filter
        if (planet.length === 0) {
            res.status(404).send("No results found!");
        }
        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
