import Head from "next/head";
import Question from "../components/Question";
import Results from "../components/Results";
import Progress from "../components/Progress";
import Form from "../components/Form";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestions,
  setCurrent,
  restart,
  setShowAnswerStatus,
} from "../store/actions/questionsAction";

const Index = () => {
  const dispatch = useDispatch();
  const { error, loading, questions, current, showForm, showAnswerStatus } =
    useSelector((state) => state.questions);

  const handleAnswer = (a) => {
    dispatch(setShowAnswerStatus(true));
    const newQuestions = [...questions];
    newQuestions[current].made = a;
    if (a === questions[current].correct_answer) {
      newQuestions[current].correct = true;
    } else {
      newQuestions[current].correct = false;
    }
    dispatch(setQuestions(newQuestions));
    const id = String(a) + String(current);
    questions[current].correct
      ? document.getElementById(id).classList.add("answer-correct")
      : document.getElementById(id).classList.add("answer-wrong");
    setTimeout(() => {
      dispatch(
        setCurrent(current === questions.length ? current : current + 1)
      );
      dispatch(setShowAnswerStatus(false));
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
      {false && !showForm && (
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
              {current < questions.length && <Progress />}
              {current < questions.length && (
                <button
                  onClick={() => {
                    dispatch(restart());
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
                <Question handleAnswer={handleAnswer} />
              )}

              {current == questions.length && questions.length > 1 && (
                <Results />
              )}
            </>
          )}
        </div>
      )}
      {showForm && <Form />}
      <Footer />
    </>
  );
};

export default Index;
