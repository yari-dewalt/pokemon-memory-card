import Modal from "../components/Modal.jsx";
import sound from "../assets/select.mp3";

function GameContinue({currentScore, continueGame, startGame })
{
  return (
    <Modal
      headerText={"You Won!"}
      description={<div>Your current score is <span className="score">{currentScore}</span>. Would you like to continue?</div>}
      buttons={[
               <button key="continue" onClick={(e) => {new Audio(sound).play(); continueGame(e)}}>Continue Game</button>,
               <button key="restart" onClick={(e) => {new Audio(sound).play(); startGame(e)}}>Restart Game</button>
              ]}/>
  )
}

export default GameContinue;
