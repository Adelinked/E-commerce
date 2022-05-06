import { useSelector } from "react-redux";

export default function () {
  const { questions, current } = useSelector((state) => state.questions);
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
