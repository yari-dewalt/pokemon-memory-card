import React from 'react';
import "../styles/Card.css";

function Card({ pokemonData, onClick, isAnyCardClicked }) {
  return (
    <div
      className={"card"}
      id={pokemonData.key}
      onClick={onClick}
    >
      <div className={`card-content ${isAnyCardClicked ? "animate" : ""}`}>
        <img className={"card-image"} src={pokemonData.pokemonImg} alt={pokemonData.pokemonName} />
        <h2 className={"card-name"}>{pokemonData.pokemonName}</h2>
      </div>
    </div>
  );
}

export default Card;
