import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

function Character() {
    const { id } = useParams();
    const [characters, setCharacters] = useState([]);
    const [homeworld, setHomeworld] = useState('');
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacters = async () => {
        const url = `http://localhost:3000/api/characters/${id}`;

        try {
            const response = await fetch(url);
            const fetchedCharacters = await response.json();
            setCharacters(fetchedCharacters);
            homeworldFinder(fetchedCharacters.homeworld);
            filmFinder(fetchedCharacters.id);
        } catch (ex) {
            console.error("Error reading characters.", ex.message);
        }
    };

    fetchCharacters();
  }, []);

  const homeworldFinder = async (id) => {
    const resp = await fetch(`http://localhost:3000/api/planets/${id}`);
    const planets = await resp.json();
    setHomeworld(planets.name);
  }

  const filmFinder = async (id) => {
    const resp = await fetch(`http://localhost:3000/api/characters/${id}/films`);
    const films = await resp.json();
    const films_names = films.map(film => film.title);
    setFilms(films_names);
  }

  const goToFilmPage = (id) => {
    navigate(`/character/${id}`);
  };

  const goToPlanetPage = (id) => {
    navigate(`/character/${id}`);
  };

  return (
    <div>
        <main>
            <h1 id="name"> {characters.name}</h1>
            <section id="generalInfo">
            <p>Height: {characters.height} cm</p>
            <p>Mass:  {characters.mass} kg</p>
            <p>Born:  {characters.birth_year}</p>
            </section>
            <section id="planets">
            <h2>Homeworld</h2>
            <p> {homeworld}</p>
            </section>
            <section id="films">
            <h2>Films appeared in</h2>
            <ul>{films}</ul>
            </section>
        </main>
    </div>
  );
}

export default Character;
