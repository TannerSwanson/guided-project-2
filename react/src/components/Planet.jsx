import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Planet(){
    const [data, setData] = useState([]);
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        
        console.log("Got id: ", id)

        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/planets/${id}`);
            
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            
            const result = await response.json();
            console.log(result);
            setData(result);
          } catch (err) {
            console.log("Error", err)
            setData([]);
          } finally {
            console.log("Finished Fetching Planets")
          }
        };

        const fetchFilms = async () => {
            try {
              const response = await fetch(`http://localhost:3000/api/planets/${id}/films`);
              
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
              
              const result = await response.json();
              console.log(result);
              setFilms(result);
            } catch (err) {
              console.log("Error", err)
              setFilms([]);
            } finally {
              console.log("Finished Fetching Planets")
            }
          };

          const fetchCharacters = async () => {
            try {
              const response = await fetch(`http://localhost:3000/api/planets/${id}/characters`);
              
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
              
              const result = await response.json();
              console.log(result);
              setCharacters(result);
            } catch (err) {
              console.log("Error", err)
              setCharacters([]);
            } finally {
              console.log("Finished Fetching Planets")
            }
          };
    
        fetchFilms();
        fetchData();
        fetchCharacters();
      }, []); 

    return(
        <>
                <h1 id="name">{data.name}</h1>
                <section id="generalInfo">
                <p>Climate: <span id="climate">{data.climate}</span></p>
                <p>Surface Water: <span id="surface_water">{data.surface_water}</span></p>
                <p>Diameter: <span id="diameter">{data.diameter}</span></p>
                <p>Rotation Period: <span id="rotational_period">{data.rotational_period}</span></p>
                <p>Terrain: <span id="terrain">{data.terrain}</span></p>
                <p>Gravity: <span id="gravity">{data.gravity}</span></p>
                <p>Orbital Period: <span id="orbital_period">{data.orbital_period}</span></p>
                <p>Population: <span id="population">{data.population}</span></p>
                </section>
                
                <section id="films">
                <h2>Films appeared in</h2>
                    {films.map(film =>{
                        return(
                            <div key={film.id}>
                            <p>{film.title}</p>
                            </div>
                        );

                    })}
                
                </section>

                <section id="characters">
                    <h2>Characters visited</h2>
                    {characters.map(c =>{
                        return(
                            <div key={c.id}>
                            <p>{c.name}</p>
                            </div>
                        );

                    })}
                </section>
        </>
    );
}

export default Planet;