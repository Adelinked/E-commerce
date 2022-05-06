import { useState } from "react";
import { fetchQuestions } from "../store/actions/questionsAction";
import { useDispatch } from "react-redux";
const defaultValues = {
  num_questions: "5",
  difficulty: "easy",
  category: "sports",
};

const catNumber = {
  sports: 21,
  history: 23,
  politics: 24,
};
export default function Form() {
  const [formValues, setFormValues] = useState(defaultValues);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const getQuestions = async () => {
    const { num_questions, category, difficulty } = formValues;
    let url = `https://opentdb.com/api.php?amount=${num_questions}`;
    if (category) url = `${url}&category=${catNumber[category]}`;
    if (difficulty) url = `${url}&difficulty=${difficulty}`;
    url = `${url}&type=multiple`;
    dispatch(fetchQuestions(url));
  };
  const formValidate = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    formValidate();
    getQuestions();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="number_questions">Number of questions:</label>
      <input
        name="num_questions"
        type="number"
        onChange={handleChange}
        value={formValues.num_questions}
        min={1}
        max={40}
      />
      <label htmlFor="category">Category:</label>
      <select
        name="category"
        onChange={handleChange}
        value={formValues.category}
      >
        {" "}
        <option value="">Any category</option>
        <option value="sports">Sport</option>
        <option value="history">History</option>
        <option value="politics">Politics</option>
      </select>
      <label htmlFor="difficulty">Difficulty:</label>
      <select
        name="difficulty"
        onChange={handleChange}
        value={formValues.difficulty}
      >
        {" "}
        <option value="">Any difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button>
        Start
        <span style={{ marginLeft: "5px", fontSize: "1.8rem" }}>&#128640;</span>
      </button>
    </form>
  );
}
