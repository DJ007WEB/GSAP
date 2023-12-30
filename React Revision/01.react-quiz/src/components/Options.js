export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((opt, i) => (
        <button
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          key={i}
          disabled={hasAnswered}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
