import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import './App.css'
import Card from "./components/Card.jsx";

function App() {
  const MAX_POKEMON_ID = 1025;
  const [gameStarted, setGameStarted] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    handleIncreaseHighScore();
  }, [currentScore]);

  function handleIncreaseCurrentScore() {
    const newCurrentScore = currentScore + 1;
    if (newCurrentScore === data.length) {
      setGameStarted(false);
      setCurrentScore(0);
    }

    else
      setCurrentScore(newCurrentScore);
  };

  function handleIncreaseHighScore() {
    setHighScore((prevHighScore) => {
      if (currentScore > prevHighScore)
        return currentScore;

      return prevHighScore;
    });
  };

  async function fetchPokemon() {
    try {
      let id = Math.floor(Math.random() * (MAX_POKEMON_ID - 1)) + 1;
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {mode: "cors"});
      const pokemonData = await pokemon.json();
      let pokemonName = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1);
      let pokemonImg = pokemonData.sprites.front_default;
      // TODO: Make sure there are no duplicates
      if (!pokemonImg)
        return fetchPokemon();

      return { pokemonName, pokemonImg };
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      return fetchPokemon();
    }
  };

  async function generateData(count) {
    const promises = Array.from({ length: count }, () => fetchPokemon());
    const data = await Promise.all(promises);

    data.forEach((i) => {
      i.key = uniqid();
      i.chosen = false;
    });

    setData(data);
  };

  function chooseCard(e) {
    let updatedData = data.map((pokemon) => {
      if (pokemon.key === e.currentTarget.id) {
        if (pokemon.chosen) {
          console.log("Already chosen!");
          setGameStarted(false);
          setCurrentScore(0);
          return pokemon;
        }

        handleIncreaseCurrentScore();
        handleIncreaseHighScore();

        return { ...pokemon, chosen: true };
      }

      return pokemon;
    });

    updatedData = shuffleData(updatedData);

    setData(updatedData);
  };

  function shuffleData(data) {
    let shuffled = data.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    console.table(shuffled);
    return shuffled;
  };

  async function startGame() {
    await generateData(6);
    // TODO: Create loading screen
    setGameStarted(true);
  }

  return (
    <>
      {!gameStarted && <button onClick={() => startGame()}>Start Game</button>}
      {gameStarted &&
        <div className="score-container">
          <h3>{currentScore}</h3>
          <h3>{highScore}</h3>
        </div>
      }
      {gameStarted &&
        <div className="card-container">
          {data.map((pokemonData) => (
            <Card key={pokemonData.key} pokemonData={pokemonData} onClick={chooseCard}/>
          ))}
        </div>
      }
    </>
  )
}

export default App
