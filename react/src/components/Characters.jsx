import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [matchingCharacters, setMatchingCharacters] = useState([]);
  const [searchString, setSearchString] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCharacters = async () => {
      const url = 'http://localhost:3000/api/characters';

      try {
        const response = await fetch(url);
        const fetchedCharacters = await response.json();
        setCharacters(fetchedCharacters);
        setMatchingCharacters(fetchedCharacters); // Initially set matching characters to all characters
      } catch (ex) {
        console.error("Error reading characters.", ex.message);
      }
    };

    fetchCharacters();
  }, []);

  const filterCharacters = () => {
    const re = new RegExp(searchString, "i");
    const filtered = characters.filter(character => re.test(character.name));
    setMatchingCharacters(filtered);
  };

  const goToCharacterPage = (id) => {
    navigate(`/character/${id}`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search characters"
      />
      <button onClick={filterCharacters}>Search</button>
      <div id="charactersList">
        {matchingCharacters.map(character => (
          <div key={character.id} onClick={() => goToCharacterPage(character.id)}>
            {character.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Characters;
