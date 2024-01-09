import "../styles/Card.css";

function Card({ pokemonData, onClick }) {
  return (
    <div className="card" id={pokemonData.key} onClick={onClick}>
      <img className="card-image" src={pokemonData.pokemonImg}></img>
      <h2 className="card-name">{pokemonData.pokemonName}</h2>
    </div>
  );
}

export default Card;
