import Answer from "./Answer";
import { useSelector } from "react-redux";
export default function Question({ handleAnswer }) {
  const { questions, current } = useSelector((state) => state.questions);
  const question = questions[current];
  const { all_answers } = question;

  return (
    <div className="question-container">
      <p dangerouslySetInnerHTML={{ __html: question.question }} />

      {all_answers.map((a, index) => (
        <Answer
          key={a}
          id={String(a) + String(current)}
          answer={a}
          handleAnswer={handleAnswer}
        />
      ))}
    </div>
  );
}
