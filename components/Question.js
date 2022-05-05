import Answer from "./Answer";
const randomize = (arr) => {
  const len = arr.length;

  let newArr = [];
  let index = 0;
  let newIndex;
  while (index < len) {
    newIndex = Math.floor(Math.random() * len);
    if (!newArr[newIndex]) {
      newArr[newIndex] = arr[index];
      index++;
    }
  }
  return newArr;
};

export default function Question({
  question,
  handleAnswer,
  all_answers,
  current,
}) {
  const answers = all_answers;
  return (
    <div className="question-container">
      <p dangerouslySetInnerHTML={{ __html: question }} />

      {answers.map((a, index) => (
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
