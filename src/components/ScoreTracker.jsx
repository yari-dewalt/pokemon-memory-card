import "../styles/ScoreTracker.css";
import trophy from "../assets/trophy.png";

function ScoreTracker({ currentScore, highScore })
{
  return (
    <div className="score-tracker">
      <h3 id="current-score">{`SCORE: ${currentScore}`}</h3>
      <div className="high-score-container">
        <h3 id="high-score-text">HIGH SCORE: </h3>
        <img id="trophy" alt="trophy icon" src={trophy}></img>
        <h3 id="high-score">{highScore}</h3>
      </div>
    </div>
  )
}

export default ScoreTracker;
