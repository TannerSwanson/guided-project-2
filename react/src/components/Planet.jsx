import React, { useState, useEffect } from 'react';

function Planet(){
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const response = await fetch('');
            
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result);
            setError(null);
          } catch (err) {
            setError(err.message);
            setData([]);
          } finally {
            setIsLoading(false);
          }
        };
    
    
        fetchData();
      }, []); 

    return(
        <>
            <body>
            <main>
                <h1 id="name"></h1>
                <section id="generalInfo">
                <p>Climate: <span id="climate"></span></p>
                <p>Surface Water: <span id="surface_water"></span></p>
                <p>Diameter: <span id="diameter"></span></p>
                <p>Rotation Period: <span id="rotational_period"></span></p>
                <p>Terrain: <span id="terrain"></span></p>
                <p>Gravity: <span id="gravity"></span></p>
                <p>Orbital Period: <span id="orbital_period"></span></p>
                <p>Population: <span id="population"></span></p>
                </section>
                
                <section id="films">
                <h2>Films appeared in</h2>
                <ul></ul>
                </section>

                <section id="characters">
                    <h2>Characters visited</h2>
                    <ul></ul>
                    </section>
            </main>
            </body>
        </>
    );
}

export default Planet;