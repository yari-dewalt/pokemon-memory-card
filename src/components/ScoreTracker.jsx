import "../styles/ScoreTracker.css";

function ScoreTracker({ currentScore, highScore })
{
  return (
    <div className="score-tracker">
      <h3 id="current-score">{`Current Score: ${currentScore}`}</h3>
      <h3 id="high-score">{`High Score: ${highScore}`}</h3>
    </div>
  )
}

export default ScoreTracker;
