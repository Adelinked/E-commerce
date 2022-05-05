import { useState } from "react";

export default function Results({ questions, restart }) {
  const [details, setDetails] = useState(false);
  const result = Math.floor(
    (questions.reduce(
      (prev, curr) => (curr.correct === true ? (prev = prev + 1) : prev),

      0
    ) *
      100) /
      questions.length
  );

  return (
    <>
      <div className="results-div">
        <p className="results-sum">Quiz finished</p>

        <button
          onClick={() => {
            restart();
          }}
        >
          Restart
          <span style={{ marginLeft: "5px", fontSize: "2.2rem" }}>
            &#10226;
          </span>
        </button>
        <p className="results-sum">You've made {result}% of correct answers</p>
        <button
          onClick={() => {
            setDetails((details) => !details);
          }}
        >
          {!details ? "Show details" : "Hide details"}
        </button>
      </div>
      {details && (
        <div className="details-div">
          {questions.map((q, index) => (
            <div key={q.question} style={{ display: "flex", flexWrap: "wrap" }}>
              <span></span>
              <p
                style={
                  !q.correct
                    ? { textDecoration: "line-through", color: "red" }
                    : {}
                }
                dangerouslySetInnerHTML={{
                  __html:
                    index +
                    1 +
                    "." +
                    q.question.slice(0, q.question.length - 1),
                }}
              />
              {q.correct === true ? (
                <>:{q.made}&#9989;</>
              ) : (
                <>
                  :{q.made}&#10060;It was: {q.correct_answer}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
