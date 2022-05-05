export default function Answer({ answer, handleAnswer, id }) {
  return (
    <div
      id={id}
      className={`answer`}
      onClick={() => handleAnswer(answer)}
      dangerouslySetInnerHTML={{ __html: answer }}
    />
  );
}
