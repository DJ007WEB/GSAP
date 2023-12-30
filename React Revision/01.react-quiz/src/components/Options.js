export default function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((opt) => (
        <button className={`btn btn-option`}>{opt}</button>
      ))}
    </div>
  );
}
