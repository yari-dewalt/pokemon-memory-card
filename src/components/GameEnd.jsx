import Modal from "./Modal.jsx";
import sound from "../assets/select.mp3";

function GameEnd({ currentScore, startGame })
{
  return (
    <Modal
      headerText={"Game Over!"}
      description={<div>Your score was <span className="score">{currentScore}</span>. Would you like to play again?</div>}
      buttons={[
               <button key="startgame" onClick={(e) => {new Audio(sound).play(); startGame(e)}}>Play Again</button>,
              ]}/>
  )
}

export default GameEnd;
