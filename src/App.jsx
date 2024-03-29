import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import './App.css'
import Card from "./components/Card.jsx";
import ScoreTracker from "./components/ScoreTracker.jsx";
import GameStart from "./components/GameStart.jsx";
import GameContinue from "./components/GameContinue.jsx";
import GameEnd from "./components/GameEnd.jsx";
import MusicButton from "./components/MusicButton.jsx";
import music from "./assets/background_music.mp3";

const audio = new Audio(music);
audio.volume = 0.2;
audio.loop = true;

function App() {
  const MAX_POKEMON_ID = 1025;
  const STARTING_NUM_OF_CARDS = 6;
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameContinued, setGameContinued] = useState(false);
  const [numCards, setNumCards] = useState(STARTING_NUM_OF_CARDS);
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [data, setData] = useState([]);
  const [isAnyCardClicked, setIsAnyCardClicked] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const savedHighScore = JSON.parse(localStorage.getItem("highScore"));
    if (savedHighScore)
      setHighScore(savedHighScore);
  }, []);

  useEffect(() => {
    handleIncreaseHighScore();
  }, [currentScore]);

  useEffect(() => {
    if (data.length > 0)
      checkWin();
  }, [data]);

  useEffect(() => {
    if (musicOn)
      audio.play();
    else
      audio.pause();
  }, [musicOn])

  function handleMusic() {
    setMusicOn((prevMusicOn) => !prevMusicOn);
    if (musicOn)
      audio.play();
  }

  function handleIncreaseCurrentScore() {
    const newCurrentScore = currentScore + 1;
    setCurrentScore(newCurrentScore);
  };

  function handleIncreaseHighScore() {
    setHighScore((prevHighScore) => {
      if (currentScore > prevHighScore) {
        localStorage.setItem("highScore", JSON.stringify(currentScore));
        return currentScore;
      }

      return prevHighScore;
    });
  };

  function handleIncreaseNumCards() {
    setNumCards((prev) => prev + 1);
  }

  function checkWin() {
    if (data.every((i) => i.chosen == true)) {
      setGameStarted(false);
      setGameEnded(true);
      setWon(true);
      handleIncreaseNumCards();
    }
  }

  async function fetchPokemon() {
    try {
      let id = Math.floor(Math.random() * (MAX_POKEMON_ID - 1)) + 1;
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {mode: "cors"});
      const pokemonData = await pokemon.json();
      let pokemonName = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1);
      let pokemonImg = pokemonData.sprites.front_default;
      if (!pokemonImg)
        return fetchPokemon();

      return { pokemonName, pokemonImg };
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      return fetchPokemon();
    }
  };

  async function generateData(count) {
    let data = [];
    const uniquePokemonNames = new Set();

    while (data.length < count) {
      const pokemon = await fetchPokemon();

      if (!uniquePokemonNames.has(pokemon.pokemonName)) {
        uniquePokemonNames.add(pokemon.pokemonName);
        data.push(pokemon);
      }
    }

    data = data.map((pokemon) => ({
      ...pokemon,
      key: uniqid(),
      chosen: false,
    }));

    setData(data);
  }

  function chooseCard(e) {
    setIsAnyCardClicked(true);
    let updatedData = data.map((pokemon) => {
      if (pokemon.key === e.currentTarget.id) {
        if (pokemon.chosen) {
          setGameStarted(false);
          setGameEnded(true);
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

    checkWin();
    setTimeout(() => {
      setIsAnyCardClicked(false);
    }, 800);
  };

  function shuffleData(data) {
    let shuffled = data.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    return shuffled;
  };

  async function startGame() {
    setGameEnded(false);
    setLoading(true);
    setWon(false);
    setCurrentScore(0);
    setNumCards(STARTING_NUM_OF_CARDS);
    await generateData(STARTING_NUM_OF_CARDS);
    setLoading(false);
    setGameStarted(true);
  }

  async function continueGame() {
    setGameEnded(false);
    setWon(false);
    setLoading(true);
    setGameContinued(true);
    await generateData(numCards);
    setLoading(false);
    setGameStarted(true);
  }

  return (
    <>
      <MusicButton musicOn={musicOn} onClick={handleMusic}/>
      {loading && <h1 style={{color: "white", fontSize: "2rem", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>Loading...</h1>}
      {won && <GameContinue currentScore={currentScore} continueGame={continueGame} startGame={startGame}/>}
      {(gameEnded && !won) && <GameEnd currentScore={currentScore} startGame={startGame}/>}
      {(!gameStarted && !loading && !won && !gameEnded) && <GameStart startGame={startGame}/>}
      {gameStarted && <ScoreTracker currentScore={currentScore} highScore={highScore}/>}
      {gameStarted &&
        <div className="card-container">
          {data.map((pokemonData) => (
            <Card key={pokemonData.key} pokemonData={pokemonData} onClick={chooseCard} isAnyCardClicked={isAnyCardClicked}/>
          ))}
        </div>
      }
    </>
  )
}

export default App
