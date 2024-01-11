import Modal from "../components/Modal.jsx";

function GameContinue({currentScore, continueGame, startGame })
{
  return (
    <Modal
      headerText={"You Won!"}
      description={`Your current score is ${currentScore}. Would you like to continue?`}
      buttons={[
               <button key="continue" onClick={continueGame}>Continue Game</button>,
               <button key="restart" onClick={startGame}>Restart Game</button>
              ]}/>
  )
}

export default GameContinue;
