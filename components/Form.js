import { useState } from "react";
export default function Form({
  formValues,
  setFormValues,
  setShowForm,
  getQuestions,
}) {
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
  const formValidate = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    formValidate();
    getQuestions();
    // setShowForm(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="number_questions">Number of questions:</label>
      <input
        name="num_questions"
        type="number"
        onChange={handleChange}
        value={formValues.num_questions}
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
