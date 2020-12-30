import { 
  GET_CANDIDATE,
  ADD_CANDIDATE,
  UNSELECT_CANDIDATE,
  GET_SKILLS,
  ADD_SKILLS,
  FAIL_SKILLS,
  GET_QUESTIONS,
  SEND_QUESTIONS
 } from "../../types";

 // eslint-disable-next-line
export default (state, action ) => {
  switch(action.type) {
    case GET_SKILLS:
      return {
        ...state,
        skills: action.payload
      }
    case GET_CANDIDATE:
      return {
        ...state,
        candidate: action.payload
      }
    case UNSELECT_CANDIDATE:
      return {
        ...state,
        candidate: null
      }
    case ADD_CANDIDATE:
      return {
        ...state,
        candidate: action.payload
      }
    case ADD_SKILLS:
      return {
        ...state,
        candidate: action.payload
      }
    case FAIL_SKILLS:
      return {
        ...state,
        candidate: action.payload
      }
    case GET_QUESTIONS:
      return{
        ...state,
        listQuestions: [...state.listQuestions, action.payload]
      }
    case SEND_QUESTIONS:
      return {
        ...state,
        candidate: action.payload
      }
    default:
      return state
  }
}