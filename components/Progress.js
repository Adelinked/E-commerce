export default function ({ questions, current }) {
  return (
    <div className="progress-div">
      {" "}
      <p>
        Correct Answers:{" "}
        {questions.reduce(
          (prev, curr) => (curr.correct === true ? (prev = prev + 1) : prev),

          0
        )}{" "}
        / {current}
      </p>
    </div>
  );
}
