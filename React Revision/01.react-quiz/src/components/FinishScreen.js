export default function FinishScreen({
  maxPossiblePoints,
  highscore,
  points,
  dispatch,
}) {
  return (
    <>
      <p className="result">
        You scored {points} out of {maxPossiblePoints}
      </p>
      <p className="highscore">HighScore : {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
