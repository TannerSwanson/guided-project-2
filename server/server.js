
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

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("films_characters");
        const filmCharactersIds = await collection.find({ film_id : parseInt(id) }).toArray(); // update filter
        if (filmCharactersIds.length === 0) {
            res.status(404).send("No results found!");
        }

        const characterIds = filmCharactersIds.map(fc => fc.character_id);
        const charactersCollection = db.collection("characters");
        const characters = await charactersCollection.find({ id: { $in: characterIds } }).toArray();
    

        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});


app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("films_characters");
        const characaterFilmsIds = await collection.find({ character_id : parseInt(id) }).toArray(); // update filter
        if ( characaterFilmsIds.length === 0) {
            res.status(404).send("No results found!");
        }

        const filmIds =  characaterFilmsIds.map(fc => fc.film_id);
        const filmsCollection = db.collection("films");
        const films = await filmsCollection.find({ id: { $in: filmIds } }).toArray();
    

        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const { id } = req.params;
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("films_planets");
        const filmPlanetsIds = await collection.find({ film_id : parseInt(id) }).toArray(); // update filter
        if (filmPlanetsIds.length === 0) {
            res.status(404).send("No results found!");
        }

        const planetIds = filmPlanetsIds.map(fc => fc.planet_id);
        const planetsCollection = db.collection("planets");
        const planets = await planetsCollection.find({ id: { $in: planetIds } }).toArray();
    

        res.json(planets);
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


app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        // Console log the entire request object
        const client = await MongoClient.connect("mongodb://localhost:27017");
        const db = client.db("swapi");
        const collection = db.collection("films_planets");
        const planetFilmIds = await collection.find({ planet_id : parseInt(id) }).toArray(); // update filter
        if (planetFilmIds.length === 0) {
            res.status(404).send("No results found!");
        }

        const filmIds = planetFilmIds.map(fc => fc.film_id);
        const filmCollection = db.collection("films");
        const films = await filmCollection.find({ id: { $in:filmIds } }).toArray();
    

        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something went wrong");
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
