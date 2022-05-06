import {
  ERROR,
  FETCH_QUESTIONS,
  LOADING_QUESTIONS,
  SET_QUESTIONS,
  SET_CURRENT,
  SET_SHOW_FORM,
  SET_SHOW_ANSWER_STATUS,
} from "../types";
const initialState = {
  loading: false,
  error: false,
  questions: [],
  current: 0,
  showForm: true,
  showAnswerStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_QUESTIONS:
      return { ...state, loading: true };
    case FETCH_QUESTIONS:
      return { ...state, questions: action.payload, loading: false };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case SET_QUESTIONS:
      return { ...state, questions: action.payload };
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case SET_SHOW_FORM:
      return { ...state, showForm: action.payload };
    case SET_SHOW_ANSWER_STATUS:
      return { ...state, showAnswerStatus: action.payload };
    default:
      return state;
  }
}
