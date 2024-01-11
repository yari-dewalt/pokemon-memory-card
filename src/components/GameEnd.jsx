import Modal from "./Modal.jsx";

function GameEnd({ currentScore, startGame })
{
  return (
    <Modal
      headerText={"Game Over!"}
      description={<div>Your score was <span className="score">{currentScore}</span>. Would you like to play again?</div>}
      buttons={[
               <button key="startgame" onClick={startGame}>Play Again</button>,
              ]}/>
  )
}

export default GameEnd;
