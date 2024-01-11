import Modal from "../components/Modal.jsx";

function GameContinue({currentScore, continueGame, startGame })
{
  return (
    <Modal
      headerText={"You Won!"}
      description={<div>Your current score is <span className="score">{currentScore}</span>. Would you like to continue?</div>}
      buttons={[
               <button key="continue" onClick={continueGame}>Continue Game</button>,
               <button key="restart" onClick={startGame}>Restart Game</button>
              ]}/>
  )
}

export default GameContinue;
