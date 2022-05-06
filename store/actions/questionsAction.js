import { randomize } from "../../utils/functions";
import axios from "axios";
export const setQuestions = (data) => async (dispatch) => {
  dispatch({ type: "SET_QUESTIONS", payload: data });
};

export const loadingQuestions = () => async (dispatch) => {
  dispatch({ type: "LOADING_QUESTIONS", payload: [] });
};

export const setError = (error) => async (dispatch) => {
  dispatch({ type: "ERROR", payload: error });
};

export const setCurrent = (val) => async (dispatch) => {
  dispatch({ type: "SET_CURRENT", payload: val });
};

export const restart = () => async (dispatch) => {
  dispatch(setCurrent(0));
  dispatch(setQuestions([]));
  dispatch(setShowForm(true));
};

export const setShowForm = (show) => async (dispatch) => {
  dispatch({ type: "SET_SHOW_FORM", payload: show });
};

export const setShowAnswerStatus = (show) => async (dispatch) => {
  dispatch({ type: "SET_SHOW_ANSWER_STATUS", payload: show });
};

export const fetchQuestions = (url) => async (dispatch) => {
  dispatch(loadingQuestions());
  try {
    const data = await axios.get(url);
    if (data.data.results.length === 0) {
      dispatch(setError(true));
      setTimeout(() => {
        dispatch(setError(false));
      }, 700);
    } else {
      dispatch(setShowForm(false));
      dispatch({
        type: "FETCH_QUESTIONS",
        payload: data.data.results.map((q) => ({
          ...q,
          correct: null,
          made: null,
          all_answers: randomize(
            [q.correct_answer, ...q.incorrect_answers] ?? []
          ),
        })),
      });
    }
  } catch (error) {
    dispatch(setError(true));
    setTimeout(() => {
      dispatch(setError(false));
    }, 700);
  }
};
