import Modal from "./Modal.jsx";
import sound from "../assets/select.mp3";

function GameStart({ startGame })
{
  return (
    <Modal
      headerText={"Welcome!"}
      description={"To play, don't click on the same card twice! Good luck!"}
      buttons={[
               <button key="startgame" onClick={(e) => {new Audio(sound).play(); startGame(e)}}>Start Game</button>,
              ]}/>
  )
}

export default GameStart;
