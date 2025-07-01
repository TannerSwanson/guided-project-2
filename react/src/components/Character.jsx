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
    setHomeworld(planets);
  }

  const filmFinder = async (id) => {
    const resp = await fetch(`http://localhost:3000/api/characters/${id}/films`);
    const filmsObj = await resp.json();
    setFilms(filmsObj);
    console.log(filmsObj);
  }

  const goToFilmPage = (id) => {
    navigate(`/film/${id}`);
  };

  const goToPlanetPage = (id) => {
    navigate(`/planet/${id}`);
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
            <div id="charactersList">
                <div key={homeworld.id} onClick={() => goToPlanetPage(homeworld.id)}>
                    {homeworld.name}
                </div>
            </div>
            </section>
            <section id="films">
            <h2>Films appeared in</h2>
            <div id="charactersList">
                {films.map(film => (
                <div key={film.id} onClick={() => goToFilmPage(film.id)}>
                    {film.title}
                </div>
                ))}
            </div>
            </section>
        </main>
    </div>
  );
}

export default Character;
