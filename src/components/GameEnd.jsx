import Modal from "./Modal.jsx";

function GameEnd({ currentScore, startGame })
{
  return (
    <Modal
      headerText={"Game Over!"}
      description={`Your final score was ${currentScore}`}
      buttons={[
               <button key="startgame" onClick={startGame}>Play Again</button>,
              ]}/>
  )
}

export default GameEnd;
