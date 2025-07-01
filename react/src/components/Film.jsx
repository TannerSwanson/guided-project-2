import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Film(){
    const [data, setData] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [characters, setCharacters] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        
        console.log("Got id: ", id)

        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/films/${id}`);
            
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
            console.log("Finished Fetching Films")
          }
        };

        const fetchPlanets = async () => {
            try {
              const response = await fetch(`http://localhost:3000/api/films/${id}/planets`);
              
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
              
              const result = await response.json();
              console.log(result);
              setPlanets(result);
            } catch (err) {
              console.log("Error", err)
              setPlanets([]);
            } finally {
              console.log("Finished Fetching Planets")
            }
          };

          const fetchCharacters = async () => {
            try {
              const response = await fetch(`http://localhost:3000/api/films/${id}/characters`);
              
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
              console.log("Finished Fetching Characters")
            }
          };
    
        fetchPlanets();
        fetchData();
        fetchCharacters();
      }, []); 

      const goToPlanetPage = (id) => {
        navigate(`/planet/${id}`);
    };

    const goToCharacterPage = (id) => {
        navigate(`/character/${id}`);
    };

    if (!data || Object.keys(data).length === 0){
      return(
        <>
        <h1>Nothing Found!</h1>
        <p>Please try another film.</p>
        </>
      )

    }

    return(
        <>
          <h1 id="film">{data.title}</h1>
        <section id="generalInfo">
          <p>Director: <span id="director">{data.director}</span></p>
          <p>Episode: <span id="episode">{data.episode_id}</span></p>
          <p>Release Date: <span id="date">{data.release_date}</span></p>
          <p>Producers: <span id="producer">{data.producer}</span></p>
        </section>
        <p id="opening_crawl"></p>
        <section id="characters">
          <h2>Character Appearances:</h2>
          <div id="charactersList">
          {characters ? (characters.map(c =>{
                        return(
                            <div key={c.id}>
                            <p onClick={() => goToCharacterPage(c.id)}>{c.name}</p>
                            </div>
                        );

                    })) : (<p>No character appearances.</p>)}
          </div>
        </section>
        <section id="planets">
            <h2>Planet Appearances:</h2>
            <div id="charactersList">
            {planets ? (planets.map(p =>{
                        return(
                            <div key={p.id}>
                            <p  onClick={() => goToPlanetPage(p.id)}>{p.name}</p>
                            </div>
                        );

                    })) : (
                <p>No planet appearances.</p> )}
            </div>
        </section>

        </>
    );
}

export default Film;