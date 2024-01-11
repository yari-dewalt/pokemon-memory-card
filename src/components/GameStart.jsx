import Modal from "./Modal.jsx";

function GameStart({ startGame })
{
  return (
    <Modal
      headerText={"Welcome!"}
      description={"To play, don't click on the same card twice! Good luck!"}
      buttons={[
               <button key="startgame" onClick={startGame}>Start Game</button>,
              ]}/>
  )
}

export default GameStart;
