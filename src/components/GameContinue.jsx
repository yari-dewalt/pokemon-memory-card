import Modal from "../components/Modal.jsx";

function GameContinue({currentScore, continueGame, startGame })
{
  return (
    <Modal
      headerText={"You Won!"}
      description={`Your final score is ${currentScore}`}
      buttons={[
               <button key="continue" onClick={continueGame}>Continue Game</button>,
               <button key="restart" onClick={startGame}>Restart Game</button>
              ]}/>
  )
}

export default GameContinue;
