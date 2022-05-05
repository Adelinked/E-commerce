import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Question from "../components/Question";
import Results from "../components/Results";
import Progress from "../components/Progress";
import Form from "../components/Form";
import Footer from "../components/Footer";
const defaultValues = {
  num_questions: "5",
  difficulty: "easy",
  category: "sports",
};
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

const catNumber = {
  sports: 21,
  history: 23,
  politics: 24,
};
const Index = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showAnswerStatus, setShowAnswerStatus] = useState(false);

  const restart = () => {
    setQuestions([]);
    setCurrent(0);
    setShowForm(true);
  };

  const getQuestions = async () => {
    const { num_questions, category, difficulty } = formValues;
    let url = `https://opentdb.com/api.php?amount=${num_questions}`;
    if (category) url = `${url}&category=${catNumber[category]}`;
    if (difficulty) url = `${url}&difficulty=${difficulty}`;
    url = `${url}&type=multiple`;
    setLoading(true);
    try {
      const data = await axios.get(url);

      if (data.data.results.length === 0) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 700);
      } else {
        setQuestions(
          data.data.results.map((q) => ({
            ...q,
            correct: null,
            all_answers: randomize(
              [q.correct_answer, ...q.incorrect_answers] ?? []
            ),
          }))
        );
        setShowForm(false);
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 700);
    }
    setLoading(false);
  };

  const handleAnswer = (a) => {
    setShowAnswerStatus(true);
    const newQuestions = [...questions];
    newQuestions[current].made = a;
    if (a === questions[current].correct_answer) {
      newQuestions[current].correct = true;
    } else {
      newQuestions[current].correct = false;
    }
    setQuestions(newQuestions);
    const id = String(a) + String(current);
    questions[current].correct
      ? document.getElementById(id).classList.add("answer-correct")
      : document.getElementById(id).classList.add("answer-wrong");
    setTimeout(() => {
      setCurrent((curr) => (curr === questions.length ? curr : curr + 1));
      setShowAnswerStatus(false);
    }, 800);
  };
  return (
    <>
      <Head>
        <title>Quiz app</title>
        <meta name="description" content="Quiz app by next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="title-div">
        <h1>Quiz app</h1>
        <a
          href="https://opentdb.com/api_config.php"
          target="_blank"
          rel="noreferrer"
          title="Powered by Open Trivia"
        >
          <img
            style={{ width: "80px", objectFit: "cover" }}
            src="OTdb.png"
            alt="Open Trivia db logo"
          />
        </a>
      </div>
      {!showForm && (
        <div className="cat-div">
          <p>Category: {formValues.category}</p>
          <p>Difficulty: {formValues.difficulty}</p>
        </div>
      )}
      <p style={{ textAlign: "center", height: "20px", color: "red" }}>
        {error && "Something went wrong try again "}
      </p>
      {loading && <div className="loading">...Loading</div>}
      {!showForm && (
        <div className="global-div">
          {!loading && (
            <>
              {current < questions.length && (
                <Progress questions={questions} current={current} />
              )}
              {current < questions.length && (
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
              )}
              <div className="answer-status">
                {showAnswerStatus && (
                  <>
                    {questions[current] && questions[current].correct ? (
                      <p style={{ color: "var(--main-green)" }}>
                        Correct answer!
                      </p>
                    ) : (
                      <p style={{ color: "var(--main-red)" }}>Wrong answer!</p>
                    )}
                  </>
                )}
              </div>
              {current < questions.length && (
                <Question
                  {...questions[current]}
                  handleAnswer={handleAnswer}
                  current={current}
                />
              )}

              {current == questions.length && questions.length > 1 && (
                <Results questions={questions} restart={restart} />
              )}
            </>
          )}
        </div>
      )}
      {showForm && (
        <Form
          formValues={formValues}
          setFormValues={setFormValues}
          setShowForm={setShowForm}
          getQuestions={getQuestions}
        />
      )}
      <Footer />{" "}
    </>
  );
};

export default Index;
